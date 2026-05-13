import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const menuPath = path.join(__dirname, 'menu-lournar.json');
let menu = JSON.parse(fs.readFileSync(menuPath, 'utf-8'));

const dbPath = path.join(__dirname, 'database.json');
let database = {
  pedidos: [],
  restaurantes: [
    {
      id: 'lournar-1',
      nombre: 'Lournar Coffee',
      direccion: 'Calle Araucarias, Col Indeco Animas, Xalapa, Veracruz',
      cp: '91190',
      telefono: '+52 228 321 8838',
      activo: true
    }
  ]
};

if (fs.existsSync(dbPath)) {
  database = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

const guardarDB = () => {
  fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));
};

app.get('/api/menu/:restaurante_id', (req, res) => {
  const rest = { ...database.restaurantes[0], telefono: menu.restaurante.telefono };
  res.json({
    success: true,
    restaurante: rest,
    menu: menu,
    zonas_envio: menu.zonas_envio
  });
});

app.post('/api/calcular-envio', (req, res) => {
  const { codigo_postal } = req.body;
  const zona = menu.zonas_envio.find(z => z.codigos_postales.includes(codigo_postal));
  
  res.json({
    success: true,
    zona: zona ? zona.nombre : 'Zona Lejana',
    costo_envio: zona ? zona.costo : 90
  });
});

app.post('/api/crear-pedido', (req, res) => {
  const { cliente_nombre, cliente_email, cliente_telefono, cliente_direccion, cliente_cp, items, metodo_pago, costo_envio } = req.body;

  if (!cliente_nombre || !items || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Datos incompletos' });
  }

  let subtotal = 0;
  items.forEach(item => {
    subtotal += (item.precio + (item.extra_precio || 0)) * item.cantidad;
  });

  const total = subtotal + (costo_envio || 0);
  const hoy = new Date().toDateString();
  const contadorHoy = database.pedidos.filter(p => new Date(p.timestamp).toDateString() === hoy).length;
  const numero_corto = 'L' + (contadorHoy + 1);
  const pedido = {
    id: uuidv4(),
    numero_corto,
    timestamp: new Date().toISOString(),
    cliente: { nombre: cliente_nombre, email: cliente_email, telefono: cliente_telefono, direccion: cliente_direccion, cp: cliente_cp },
    items: items,
    subtotal: subtotal,
    costo_envio: costo_envio || 0,
    total: total,
    metodo_pago: metodo_pago,
    estado: 'preparando',
    restaurante_id: 'lournar-1'
  };

  database.pedidos.push(pedido);
  guardarDB();

  res.json({
    success: true,
    mensaje: 'Pedido creado exitosamente',
    pedido: pedido
  });
});

app.get('/api/admin/pedidos/:restaurante_id', (req, res) => {
  const pedidos = database.pedidos.filter(p => p.restaurante_id === req.params.restaurante_id);
  res.json({
    success: true,
    total: pedidos.length,
    pedidos: pedidos.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  });
});

app.put('/api/admin/pedido/:pedido_id', (req, res) => {
  const pedido = database.pedidos.find(p => p.id === req.params.pedido_id);
  if (!pedido) return res.status(404).json({ success: false, error: 'Pedido no encontrado' });

  pedido.estado = req.body.estado;
  guardarDB();

  res.json({ success: true, mensaje: 'Pedido actualizado', pedido: pedido });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 PIDOYA - Servidor Iniciado       ║
║   🌐 http://localhost:${PORT}            ║
║   📱 Lournar Coffee - Xalapa          ║
║   ✅ Base de datos: ${database.pedidos.length} pedidos  ║
╚════════════════════════════════════════╝
  `);
});
