import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
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
// RUTAS DEL FRONTEND (index.html)
// ══════════════════════════════════════

// GET /api/menu/:restaurante_id
app.get('/api/menu/:restaurante_id', (req, res) => {
  const rest = { ...restaurante, telefono: menu.restaurante.telefono };
  res.json({
    success: true,
    restaurante: rest,
    menu: menu,
    zonas_envio: menu.zonas_envio
  });
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
    // Obtener número corto del día desde Supabase
    const hoy = new Date();
    const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()).toISOString();
    
    const { data: pedidosHoy, error: countErr } = await supabase
      .from('orders')
      .select('id')
      .gte('created_at', inicioHoy);
    
    const contadorHoy = (pedidosHoy && !countErr) ? pedidosHoy.length : 0;
    const numero_corto = 'L' + (contadorHoy + 1);

    // Insertar pedido en Supabase
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
      preparation_time: 0
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

    // Responder con formato compatible al frontend
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

    // Transformar formato de Supabase al formato que espera el admin dashboard
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
║   ✅ Base de datos: ${count} pedidos       ║
╚════════════════════════════════════════╝
  `);
});