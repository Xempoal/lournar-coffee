import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar Supabase
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://pxkekjeioiuclizqtjvo.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_qWY-k5L991vGsjMgSRa85g_Yb_8YNXb';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Tokens activos (en memoria — se pierden al reiniciar, pero eso solo cierra sesión)
const activeTokens = new Map();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Cargar menú local
const menuPath = path.join(__dirname, 'menu-lournar.json');
let menu = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

// Info del restaurante
const restaurante = {
  id: 'lournar-1',
  nombre: 'Lournar Coffee',
  direccion: 'Calle Araucarias, Col Indeco Animas, Xalapa, Veracruz',
  cp: '91190',
  telefono: '+52 228 321 8838',
  activo: true
};

// ══════════════════════════════════════
// MIDDLEWARE DE AUTENTICACIÓN
// ══════════════════════════════════════

function requireAuth(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({ success: false, error: 'No autorizado' });
  }
  req.auth = activeTokens.get(token);
  next();
}

// ══════════════════════════════════════
// RUTAS DE AUTENTICACIÓN
// ══════════════════════════════════════

// GET /api/auth/info/:slug — Info pública del restaurante (para mostrar nombre en login)
app.get('/api/auth/info/:slug', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('restaurant_config')
      .select('restaurant_name, slug')
      .eq('slug', req.params.slug)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, error: 'Negocio no encontrado' });
    }

    res.json({ success: true, restaurant_name: data.restaurant_name });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error interno' });
  }
});

// POST /api/auth/login — Verificar PIN y generar token
app.post('/api/auth/login', async (req, res) => {
  const { slug, pin } = req.body;

  if (!slug || !pin || pin.length !== 6) {
    return res.status(400).json({ success: false, error: 'PIN de 6 dígitos requerido' });
  }

  try {
    const { data, error } = await supabase
      .from('restaurant_config')
      .select('id, restaurant_name, slug, pin')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, error: 'Negocio no encontrado' });
    }

    if (data.pin !== pin) {
      return res.status(401).json({ success: false, error: 'PIN incorrecto' });
    }

    // Generar token
    const token = crypto.randomBytes(32).toString('hex');
    activeTokens.set(token, {
      restaurant_id: data.id,
      restaurant_name: data.restaurant_name,
      slug: data.slug,
      created: Date.now()
    });

    // Limpiar tokens viejos (más de 24 horas)
    for (const [t, info] of activeTokens) {
      if (Date.now() - info.created > 86400000) activeTokens.delete(t);
    }

    res.json({
      success: true,
      token,
      restaurant_id: data.id,
      restaurant_name: data.restaurant_name
    });
  } catch (err) {
    console.error('Error login:', err);
    res.status(500).json({ success: false, error: 'Error interno' });
  }
});

// POST /api/auth/verify — Verificar si un token sigue activo
app.post('/api/auth/verify', (req, res) => {
  const { token } = req.body;
  if (!token || !activeTokens.has(token)) {
    return res.json({ success: false });
  }
  const info = activeTokens.get(token);
  res.json({ success: true, restaurant_name: info.restaurant_name, slug: info.slug });
});

// ══════════════════════════════════════
// RUTAS PARA SERVIR PÁGINAS ADMIN
// ══════════════════════════════════════

// /admin/lournar → página de login
app.get('/admin/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));
});

// /admin/dashboard/lournar → dashboard (protegido por JS)
app.get('/admin/dashboard/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
});

// ══════════════════════════════════════
// RUTAS DEL FRONTEND (index.html)
// ══════════════════════════════════════

// GET /api/menu/:restaurante_id
app.get('/api/menu/:restaurante_id', async (req, res) => {
  try {
    const [catsResult, prodsResult] = await Promise.all([
      supabase.from('menu_categories').select('*').eq('restaurant_id', 1).order('orden', { ascending: true }),
      supabase.from('menu_products').select('*').eq('restaurant_id', 1).eq('disponible', true).order('orden', { ascending: true })
    ]);
    const cats  = catsResult.data  || [];
    const prods = prodsResult.data || [];
    const categorias = cats.map(cat => ({
      id: cat.category_id,
      nombre: cat.nombre,
      items: prods
        .filter(p => p.category_id === cat.category_id)
        .map(p => ({
          id: p.product_id,
          nombre: p.nombre,
          descripcion: p.descripcion || '',
          precio: parseFloat(p.precio),
          imagen: p.imagen_url || ''
        }))
    }));
    const rest = { ...restaurante, telefono: menu.restaurante.telefono };
    res.json({
      success: true,
      restaurante: rest,
      menu: { categorias },
      zonas_envio: menu.zonas_envio
    });
  } catch (err) {
    console.error('Error building menu:', err);
    res.status(500).json({ success: false, error: 'Error obteniendo menú' });
  }
});

// POST /api/calcular-envio
app.post('/api/calcular-envio', (req, res) => {
  const { codigo_postal } = req.body;
  const zona = menu.zonas_envio.find(z => z.codigos_postales.includes(codigo_postal));
  res.json({
    success: true,
    zona: zona ? zona.nombre : 'Zona Lejana',
    costo_envio: zona ? zona.costo : 90
  });
});

// POST /api/crear-pedido
app.post('/api/crear-pedido', async (req, res) => {
  const { cliente_nombre, cliente_email, cliente_telefono, cliente_direccion, cliente_cp, items, metodo_pago, costo_envio } = req.body;

  if (!cliente_nombre || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Datos incompletos' });
  }

  let subtotal = 0;
  items.forEach(item => {
    subtotal += (item.precio + (item.extra_precio || 0)) * item.cantidad;
  });

  const total = subtotal + (costo_envio || 0);

  try {
    const hoy = new Date();
    const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).toISOString();

    const { data: pedidosHoy, error: countErr } = await supabase
      .from('orders')
      .select('id')
      .gte('created_at', inicioHoy);

    const contadorHoy = (pedidosHoy && !countErr) ? pedidosHoy.length : 0;
    const numero_corto = 'L' + (contadorHoy + 1);

    const pedido = {
      order_number: numero_corto,
      customer_name: cliente_nombre,
      customer_phone: cliente_telefono || '',
      delivery_type: (costo_envio && costo_envio > 0) ? 'delivery' : 'pickup',
      address: cliente_direccion || null,
      postal_code: cliente_cp || null,
      payment_method: metodo_pago || '',
      items: items,
      total: total,
      status: 'preparando',
      preparation_time: 0,
      restaurant_id: 1
    };

    const { data, error } = await supabase
      .from('orders')
      .insert([pedido])
      .select();

    if (error) {
      console.error('Error Supabase:', error);
      return res.status(500).json({ success: false, error: 'Error guardando pedido' });
    }

    const saved = data[0];

    res.json({
      success: true,
      mensaje: 'Pedido creado exitosamente',
      pedido: {
        id: saved.id.toString(),
        numero_corto: saved.order_number,
        timestamp: saved.created_at,
        cliente: {
          nombre: cliente_nombre,
          email: cliente_email || '',
          telefono: cliente_telefono || '',
          direccion: cliente_direccion || '',
          cp: cliente_cp || ''
        },
        items: items,
        subtotal: subtotal,
        costo_envio: costo_envio || 0,
        total: total,
        metodo_pago: metodo_pago,
        estado: 'preparando',
        restaurante_id: 'lournar-1'
      }
    });
  } catch (err) {
    console.error('Error creando pedido:', err);
    res.status(500).json({ success: false, error: 'Error interno' });
  }
});

// ══════════════════════════════════════
// RUTAS DEL ADMIN (admin-dashboard.html)
// ══════════════════════════════════════

// GET /api/admin/pedidos/:restaurante_id
app.get('/api/admin/pedidos/:restaurante_id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error Supabase:', error);
      return res.status(500).json({ success: false, error: 'Error obteniendo pedidos' });
    }

    const pedidos = (data || []).map(row => ({
      id: row.id.toString(),
      numero_corto: row.order_number,
      timestamp: row.created_at,
      cliente: {
        nombre: row.customer_name,
        email: '',
        telefono: row.customer_phone || '',
        direccion: row.address || '',
        cp: row.postal_code || ''
      },
      items: row.items || [],
      subtotal: row.delivery_type === 'delivery'
        ? parseFloat(row.total) - calculateShipping(row.postal_code)
        : parseFloat(row.total),
      costo_envio: row.delivery_type === 'delivery' ? calculateShipping(row.postal_code) : 0,
      total: parseFloat(row.total),
      metodo_pago: row.payment_method,
      estado: row.status,
      restaurante_id: 'lournar-1'
    }));

    res.json({
      success: true,
      total: pedidos.length,
      pedidos: pedidos
    });
  } catch (err) {
    console.error('Error obteniendo pedidos:', err);
    res.status(500).json({ success: false, error: 'Error interno' });
  }
});

// PUT /api/admin/pedido/:pedido_id
app.put('/api/admin/pedido/:pedido_id', async (req, res) => {
  const { pedido_id } = req.params;
  const { estado } = req.body;

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status: estado, updated_at: new Date().toISOString() })
      .eq('id', parseInt(pedido_id))
      .select();

    if (error) {
      console.error('Error Supabase:', error);
      return res.status(500).json({ success: false, error: 'Error actualizando pedido' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ success: false, error: 'Pedido no encontrado' });
    }

    const row = data[0];
    res.json({
      success: true,
      mensaje: 'Pedido actualizado',
      pedido: {
        id: row.id.toString(),
        numero_corto: row.order_number,
        estado: row.status
      }
    });
  } catch (err) {
    console.error('Error actualizando pedido:', err);
    res.status(500).json({ success: false, error: 'Error interno' });
  }
});

// Helper: calcular costo de envío por CP
function calculateShipping(cp) {
  if (!cp) return 0;
  const zona = menu.zonas_envio?.find(z => z.codigos_postales?.includes(cp));
  return zona ? zona.costo : 90;
}
// ══════════════════════════════════════
// RUTAS GESTIÓN DE MENÚ (agregar después de /api/auth/verify)
// ══════════════════════════════════════

// GET /admin/menu/:slug → servir página de menú
app.get('/admin/menu/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-menu.html'));
});

// GET /api/admin/menu/categories
app.get('/api/admin/menu/categories', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu_categories')
      .select('*')
      .eq('restaurant_id', req.auth.restaurant_id)
      .order('orden', { ascending: true });
    if (error) throw error;
    res.json({ success: true, categories: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error obteniendo categorías' });
  }
});

// GET /api/admin/menu/products
app.get('/api/admin/menu/products', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('menu_products')
      .select('*')
      .eq('restaurant_id', req.auth.restaurant_id)
      .order('orden', { ascending: true });
    if (error) throw error;
    res.json({ success: true, products: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error obteniendo productos' });
  }
});

// POST /api/admin/menu/products — agregar producto
app.post('/api/admin/menu/products', requireAuth, async (req, res) => {
  const { nombre, descripcion, precio, category_id, tiempo_preparacion, imagen_url } = req.body;
  if (!nombre || !precio) return res.status(400).json({ success: false, error: 'Nombre y precio requeridos' });
  try {
    const product_id = nombre.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') + '_' + Date.now();
    const { data, error } = await supabase
      .from('menu_products')
      .insert([{ restaurant_id: req.auth.restaurant_id, category_id, product_id, nombre, descripcion: descripcion || '', precio, tiempo_preparacion: tiempo_preparacion || 5, disponible: true, imagen_url: imagen_url || null }])
      .select();
    if (error) throw error;
    res.json({ success: true, product: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error creando producto' });
  }
});

// PUT /api/admin/menu/products/:id — editar producto
app.put('/api/admin/menu/products/:id', requireAuth, async (req, res) => {
  const { nombre, descripcion, precio, category_id, tiempo_preparacion, imagen_url } = req.body;
  try {
    const { data, error } = await supabase
      .from('menu_products')
      .update({ nombre, descripcion, precio, category_id, tiempo_preparacion: tiempo_preparacion || 5, imagen_url: imagen_url || null })
      .eq('id', req.params.id)
      .eq('restaurant_id', req.auth.restaurant_id)
      .select();
    if (error) throw error;
    res.json({ success: true, product: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error actualizando producto' });
  }
});

// PATCH /api/admin/menu/products/:id — toggle disponible
app.patch('/api/admin/menu/products/:id', requireAuth, async (req, res) => {
  const { disponible } = req.body;
  try {
    const { data, error } = await supabase
      .from('menu_products')
      .update({ disponible })
      .eq('id', req.params.id)
      .eq('restaurant_id', req.auth.restaurant_id)
      .select();
    if (error) throw error;
    res.json({ success: true, product: data[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error actualizando producto' });
  }
});

// DELETE /api/admin/menu/products/:id — eliminar producto
app.delete('/api/admin/menu/products/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabase
      .from('menu_products')
      .delete()
      .eq('id', req.params.id)
      .eq('restaurant_id', req.auth.restaurant_id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error eliminando producto' });
  }
});
// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, async () => {
  let count = 0;
  try {
    const { data } = await supabase.from('orders').select('id');
    count = data ? data.length : 0;
  } catch (e) {}

  console.log(`
╔════════════════════════════════════════╗
║   🚀 PIDOYA - Servidor Iniciado       ║
║   🌐 http://localhost:${PORT}            ║
║   📱 Lournar Coffee - Xalapa          ║
║   ☁️  Supabase conectado               ║
║   🔐 Auth con PIN activado            ║
║   ✅ Base de datos: ${count} pedidos       ║
╚════════════════════════════════════════╝
  `);
});