/* Veterinaria San Marcos - Lógica Mínima */
const productos = [
  { id: "SV001", nombre: "Consulta general", precio: 15000, atributo: "Perro / Gato", img: "img/consulta-general.jpg", categoria: "Consultas" },
  { id: "VA001", nombre: "Vacuna antirrábica", precio: 12000, atributo: "Perro / Gato", img: "img/vacuna-antirrabica.jpg", categoria: "Vacunas" },
  { id: "ME001", nombre: "Amoxibay 250mg", precio: 4200, atributo: "Antibióticos", img: "img/amoxibay.jpg", categoria: "Farmacia" },
  { id: "ME004", nombre: "Nexgard Antiparasitario", precio: 9500, atributo: "Masticable Perro", img: "img/nexgard.jpg", categoria: "Farmacia" },
  { id: "OT002", nombre: "Limpieza dental", precio: 55000, atributo: "Requiere anestesia", img: "img/limpieza-dental.jpg", categoria: "Consultas" },
  { id: "SV002", nombre: "Consulta urgencia", precio: 25000, atributo: "Atención 24/7", img: "img/consulta-urgencia.jpg", categoria: "Consultas" },
  { id: "ME011", nombre: "Clorhexidina Shampoo", precio: 8900, atributo: "Dermatología 250ml", img: "img/shampoo-clorhexidina.jpg", categoria: "Farmacia" },
  { id: "OT003", nombre: "Microchip identificación", precio: 15000, atributo: "Incluye registro", img: "img/microchip.jpg", categoria: "Consultas" }
];

let carrito = JSON.parse(localStorage.getItem('carritoVeterinaria')) || [];

document.addEventListener('DOMContentLoaded', () => { renderCatalogo(); renderCarrito(); actualizarUI(); });

// Renderiza catálogo y aplica filtro si viene ?categoria=...
function renderCatalogo() {
  const grid = document.querySelector('.publico .catalogo-dinamico');
  if (!grid) return;
  const cat = new URLSearchParams(window.location.search).get('categoria');
  const lista = cat ? productos.filter(p => p.categoria.toLowerCase() === cat.toLowerCase()) : productos;

  grid.innerHTML = lista.map(p => `
    <article class="product-card">
      <img src="${p.img}" alt="${p.nombre}" class="product-img">
      <h3 class="product-title"><a href="detalle-producto.html?id=${p.id}">${p.nombre}</a></h3>
      <div class="product-info"><span>${p.atributo}</span><span class="price">$${p.precio.toLocaleString('es-CL')}</span></div>
      <button class="btn-hero" onclick="agregar('${p.id}')" style="width:100%; cursor:pointer; margin-top:0.5rem;">🛒 Agregar</button>
    </article>`).join('');
}

// Operaciones del Carrito
function agregar(id) {
  const item = carrito.find(p => p.id === id);
  item ? item.cantidad++ : carrito.push({ ...productos.find(p => p.id === id), cantidad: 1 });
  guardar();
}

function cambiarCant(id, cambio) {
  const item = carrito.find(p => p.id === id);
  if (item) item.cantidad += cambio;
  carrito = carrito.filter(p => p.cantidad > 0);
  guardar();
}

function renderCarrito() {
  const contenedor = document.querySelector('.publico .carrito-lista');
  if (!contenedor) return;
  if (!carrito.length) return contenedor.innerHTML = '<p style="padding:1rem;">El carrito está vacío.</p>';

  contenedor.innerHTML = carrito.map(i => `
    <article class="product-card" style="display:flex; justify-content:space-between; align-items:center; padding:1rem; margin-bottom:1rem;">
      <div><h4>${i.nombre}</h4><span class="price">$${i.precio.toLocaleString('es-CL')}</span></div>
      <div>
        <button onclick="cambiarCant('${i.id}', -1)">-</button>
        <b style="margin:0 0.5rem;">${i.cantidad}</b>
        <button onclick="cambiarCant('${i.id}', 1)">+</button>
      </div>
    </article>`).join('');
}

function actualizarUI() {
  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const cantTotal = carrito.reduce((sum, i) => sum + i.cantidad, 0);
  
  const totalEl = document.querySelector('.publico .monto-total');
  const cartHeader = document.querySelector('.publico .icono-carrito a');
  
  if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
  if (cartHeader) cartHeader.textContent = `🛒 Carrito (${cantTotal})`;
}

function guardar() {
  localStorage.setItem('carritoVeterinaria', JSON.stringify(carrito));
  renderCarrito();
  actualizarUI();
}

function procesarPago() {
  if (!carrito.length) return alert('El carrito está vacío.');
  alert('¡Gracias por tu compra!');
  carrito = [];
  guardar();
}