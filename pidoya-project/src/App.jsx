import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [menu, setMenu] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState({
    nombre: '', email: '', telefono: '', direccion: '', cp: ''
  });
  const [costoEnvio, setCostoEnvio] = useState(0);
  const [metodoPago, setMetodoPago] = useState('efectivo');
  const [pedidoConfirmado, setPedidoConfirmado] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/menu/lournar-1`)
      .then(r => r.json())
      .then(data => setMenu(data))
      .catch(e => console.error(e));
  }, []);

  const calcularEnvio = async (cp) => {
    if (!cp) return;
    const res = await fetch(`${API_BASE}/calcular-envio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo_postal: cp })
    });
    const data = await res.json();
    if (data.success) setCostoEnvio(data.costo_envio);
  };

  const agregarAlCarrito = (item, categoria) => {
    setCarrito([...carrito, { ...item, id: `${item.id}-${Date.now()}`, cantidad: 1 }]);
  };

  const actualizarCarrito = (itemId, cantidad) => {
    if (cantidad <= 0) {
      setCarrito(carrito.filter(c => c.id !== itemId));
    } else {
      setCarrito(carrito.map(c => c.id === itemId ? { ...c, cantidad } : c));
    }
  };

  const confirmarPedido = async () => {
    if (!cliente.nombre || !cliente.telefono || !cliente.cp) {
      alert('Completa todos los datos');
      return;
    }

    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const total = subtotal + costoEnvio;

    const res = await fetch(`${API_BASE}/crear-pedido`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente_nombre: cliente.nombre,
        cliente_email: cliente.email,
        cliente_telefono: cliente.telefono,
        cliente_direccion: cliente.direccion,
        cliente_cp: cliente.cp,
        items: carrito,
        metodo_pago: metodoPago,
        costo_envio: costoEnvio
      })
    });
    const data = await res.json();
    if (data.success) {
      setPedidoConfirmado(data.pedido);
      setCarrito([]);
      setPantalla('confirmacion');
    }
  };

  if (!menu) return <div className="loading">Cargando...</div>;

  if (pantalla === 'inicio') {
    return (
      <div className="container">
        <header className="header-inicio">
          <div className="logo">☕ Lournar Coffee</div>
          <p>Calle Araucarias, Xalapa, Veracruz</p>
        </header>
        <main className="inicio-content">
          <h1>¡Hola! Bienvenido</h1>
          <p>Aquí puedes ver nuestro menú y hacer tu pedido fácil y rápido.</p>
          <button className="btn-grande" onClick={() => setPantalla('menu')}>📋 Ver Menú</button>
          {carrito.length > 0 && <button className="btn-grande btn-secondary" onClick={() => setPantalla('checkout')}>🛒 Carrito ({carrito.length})</button>}
        </main>
      </div>
    );
  }

  if (pantalla === 'menu') {
    return (
      <div className="container">
        <header className="header"><button onClick={() => setPantalla('inicio')}>← Atrás</button><h1>☕ Menú</h1>{carrito.length > 0 && <button onClick={() => setPantalla('checkout')}>🛒 {carrito.length}</button>}</header>
        <main className="menu-content">{menu.categorias.map(cat => (<section key={cat.id} className="categoria"><h2>{cat.nombre}</h2><div className="items-grid">{cat.items.map(item => (<div key={item.id} className="item-card"><h3>{item.nombre}</h3><p>{item.descripcion}</p><p className="precio">${item.precio}</p><button onClick={() => agregarAlCarrito(item, cat.id)}>➕ Agregar</button></div>))}</div></section>))}</main>
      </div>
    );
  }

  if (pantalla === 'checkout') {
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const total = subtotal + costoEnvio;
    return (
      <div className="container">
        <header className="header"><button onClick={() => setPantalla('menu')}>← Atrás</button><h1>🛒 Tu Pedido</h1></header>
        <main className="checkout-content">
          <section className="seccion"><h2>📦 Artículos</h2>{carrito.map(item => (<div key={item.id} className="carrito-item"><div><strong>{item.nombre}</strong><p>x{item.cantidad} × ${item.precio}</p></div><button onClick={() => actualizarCarrito(item.id, item.cantidad - 1)}>−</button><span>{item.cantidad}</span><button onClick={() => actualizarCarrito(item.id, item.cantidad + 1)}>+</button></div>))}</section>
          <section className="seccion"><h2>👤 Tus Datos</h2><input placeholder="Nombre *" value={cliente.nombre} onChange={(e) => setCliente({...cliente, nombre: e.target.value})} /><input placeholder="Email" value={cliente.email} onChange={(e) => setCliente({...cliente, email: e.target.value})} /><input placeholder="Teléfono *" value={cliente.telefono} onChange={(e) => setCliente({...cliente, telefono: e.target.value})} /><input placeholder="Dirección" value={cliente.direccion} onChange={(e) => setCliente({...cliente, direccion: e.target.value})} /><input placeholder="Código postal *" value={cliente.cp} onChange={(e) => {setCliente({...cliente, cp: e.target.value});calcularEnvio(e.target.value);}} /></section>
          <section className="seccion"><h2>💳 Método de Pago</h2><label><input type="radio" value="efectivo" checked={metodoPago === 'efectivo'} onChange={(e) => setMetodoPago(e.target.value)} /> Efectivo</label><label><input type="radio" value="tarjeta" checked={metodoPago === 'tarjeta'} onChange={(e) => setMetodoPago(e.target.value)} /> Tarjeta</label><label><input type="radio" value="transferencia" checked={metodoPago === 'transferencia'} onChange={(e) => setMetodoPago(e.target.value)} /> Transferencia</label></section>
          <section className="total-seccion"><p>Subtotal: ${subtotal}</p><p>Envío: ${costoEnvio}</p><p className="total">TOTAL: ${total}</p></section>
          <button className="btn-grande" onClick={confirmarPedido} disabled={carrito.length === 0}>✅ Confirmar Pedido</button>
        </main>
      </div>
    );
  }

  if (pantalla === 'confirmacion' && pedidoConfirmado) {
    return (
      <div className="container">
        <main className="confirmacion-content">
          <div className="check">✅</div>
          <h1>¡Pedido Recibido!</h1>
          <p>ID: {pedidoConfirmado.id}</p>
          <p>Total: ${pedidoConfirmado.total}</p>
          <button className="btn-grande" onClick={() => {setPantalla('inicio');setCliente({ nombre: '', email: '', telefono: '', direccion: '', cp: '' });setCostoEnvio(0);}}>🏠 Volver</button>
        </main>
      </div>
    );
  }

  return null;
}
