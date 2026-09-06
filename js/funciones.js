/* ==========================================================================
   Veterinaria San Marcos - Lógica de Tienda y Formularios
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. ESTADO Y CONFIGURACIÓN GLOBAL
   -------------------------------------------------------------------------- */
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

const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const comunasPorRegion = {
  "Metropolitana": ["Santiago", "Providencia", "San Bernardo", "Maipú"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"]
};

const CONFIG_PUBLICO = {
  mensajes: {
    exitoContacto: "¡Mensaje enviado con éxito! Te responderemos a la brevedad.",
    exitoLogin: "Inicio de sesión correcto. Redirigiendo...",
    exitoRegistro: "Registro completado con éxito.",
    camposObligatorios: "Por favor, completa todos los campos requeridos.",
    correoInvalido: "Ingresa un correo electrónico válido.",
    correosNoCoinciden: "Los correos electrónicos no coinciden.",
    passwordsNoCoinciden: "Las contraseñas no coinciden."
  }
};

/* --------------------------------------------------------------------------
   2. INICIALIZADOR DE APLICACIÓN
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Lógica de Tienda / Carrito
  renderCatalogo();
  renderCarrito();
  actualizarUI();

  // Lógica de Formularios
  initFormContacto();
  initFormInicio();
  initFormRegistro();
});

/* --------------------------------------------------------------------------
   3. MÓDULO DE TIENDA Y CARRITO (E-COMMERCE)
   -------------------------------------------------------------------------- */

// Renderiza catálogo y aplica filtro si viene el parámetro ?categoria=...
function renderCatalogo() {
  const grid = document.querySelector('.publico .catalogo-dinamico');
  if (!grid) return;

  const cat = new URLSearchParams(window.location.search).get('categoria');
  const lista = cat ? productos.filter(p => p.categoria.toLowerCase() === cat.toLowerCase()) : productos;

  grid.innerHTML = lista.map(p => `
    <article class="product-card">
      <img src="${p.img}" alt="${p.nombre}" class="product-img">
      <h3 class="product-title"><a href="detalle-producto.html?id=${p.id}">${p.nombre}</a></h3>
      <div class="product-info">
        <span>${p.atributo}</span>
        <span class="price">$${p.precio.toLocaleString('es-CL')}</span>
      </div>
      <button class="btn-hero" onclick="agregar('${p.id}')" style="width:100%; cursor:pointer; margin-top:0.5rem;">🛒 Agregar</button>
    </article>`).join('');
}

// Agrega un producto al carrito
function agregar(id) {
  const item = carrito.find(p => p.id === id);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ ...productos.find(p => p.id === id), cantidad: 1 });
  }
  guardar();
}

// Incrementa o disminuye la cantidad de un ítem en el carrito
function cambiarCant(id, cambio) {
  const item = carrito.find(p => p.id === id);
  if (item) item.cantidad += cambio;
  carrito = carrito.filter(p => p.cantidad > 0);
  guardar();
}

// Renderiza los productos agregados al carrito
function renderCarrito() {
  const contenedor = document.querySelector('.publico .carrito-lista');
  if (!contenedor) return;

  if (!carrito.length) {
    contenedor.innerHTML = '<p style="padding:1rem;">El carrito está vacío.</p>';
    return;
  }

  contenedor.innerHTML = carrito.map(i => `
    <article class="product-card" style="display:flex; justify-content:space-between; align-items:center; padding:1rem; margin-bottom:1rem;">
      <div>
        <h4>${i.nombre}</h4>
        <span class="price">$${i.precio.toLocaleString('es-CL')}</span>
      </div>
      <div>
        <button onclick="cambiarCant('${i.id}', -1)">-</button>
        <b style="margin:0 0.5rem;">${i.cantidad}</b>
        <button onclick="cambiarCant('${i.id}', 1)">+</button>
      </div>
    </article>`).join('');
}

// Actualiza los totales y la visualización del header
function actualizarUI() {
  const total = carrito.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  const cantTotal = carrito.reduce((sum, i) => sum + i.cantidad, 0);

  const totalEl = document.querySelector('.publico .monto-total');
  const cartHeader = document.querySelector('.publico .icono-carrito a');

  if (totalEl) totalEl.textContent = `$${total.toLocaleString('es-CL')}`;
  if (cartHeader) cartHeader.textContent = `🛒 Carrito (${cantTotal})`;
}

// Persiste el estado del carrito en LocalStorage
function guardar() {
  localStorage.setItem('carritoVeterinaria', JSON.stringify(carrito));
  renderCarrito();
  actualizarUI();
}

// Procesa el pago simulado
function procesarPago() {
  if (!carrito.length) return alert('El carrito está vacío.');
  alert('¡Gracias por tu compra!');
  carrito = [];
  guardar();
}

/* --------------------------------------------------------------------------
   4. FUNCIONES AUXILIARES DE VALIDACIÓN DE FORMULARIOS
   -------------------------------------------------------------------------- */

function mostrarMensaje(elemento, texto, esExito) {
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.classList.toggle('exito', esExito);
  elemento.classList.toggle('error', !esExito);
}

function validarCampo(input) {
  const esValido = input.value.trim() !== '';
  input.classList.toggle('campo-error', !esValido);
  return esValido;
}

function validarCorreo(input) {
  const esValido = patronCorreo.test(input.value.trim());
  input.classList.toggle('campo-error', !esValido);
  return esValido;
}

/* --------------------------------------------------------------------------
   5. MÓDULO DE FORMULARIOS
   -------------------------------------------------------------------------- */

/* Formulario de Contacto */
function initFormContacto() {
  const formContacto = document.querySelector('#formulario-contacto');
  if (!formContacto) return;

  formContacto.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre');
    const correo = document.querySelector('#correo');
    const contenido = document.querySelector('#contenido');
    const mensajeEstado = document.querySelector('#mensaje-estado');

    let formularioValido = true;
    let mensajeError = CONFIG_PUBLICO.mensajes.camposObligatorios;

    if (!validarCampo(nombre)) formularioValido = false;
    if (!validarCampo(contenido)) formularioValido = false;

    if (!validarCorreo(correo)) {
      formularioValido = false;
      mensajeError = CONFIG_PUBLICO.mensajes.correoInvalido;
    }

    if (formularioValido) {
      mostrarMensaje(mensajeEstado, CONFIG_PUBLICO.mensajes.exitoContacto, true);
      formContacto.reset();
    } else {
      mostrarMensaje(mensajeEstado, mensajeError, false);
    }
  });
}

/* Formulario de Inicio de Sesión */
function initFormInicio() {
  const formInicio = document.querySelector('#formulario-inicio');
  if (!formInicio) return;

  formInicio.addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = document.querySelector('#correo');
    const password = document.querySelector('#password');
    const mensajeEstado = document.querySelector('#mensaje-estado');

    let formularioValido = true;
    let mensajeError = CONFIG_PUBLICO.mensajes.camposObligatorios;

    if (!validarCampo(password)) formularioValido = false;

    if (!validarCorreo(correo)) {
      formularioValido = false;
      mensajeError = CONFIG_PUBLICO.mensajes.correoInvalido;
    }

    if (formularioValido) {
      mostrarMensaje(mensajeEstado, CONFIG_PUBLICO.mensajes.exitoLogin, true);
      formInicio.reset();
    } else {
      mostrarMensaje(mensajeEstado, mensajeError, false);
    }
  });
}

/* Formulario de Registro */
function initFormRegistro() {
  const formRegistro = document.querySelector('#formulario-registro');
  if (!formRegistro) return;

  const selectRegion = document.querySelector('#region');
  const selectComuna = document.querySelector('#comuna');

  // Cargar regiones al inicializar
  Object.keys(comunasPorRegion).forEach(region => {
    const opcion = document.createElement('option');
    opcion.value = region;
    opcion.textContent = region;
    selectRegion.appendChild(opcion);
  });

  // Evento de cambio de región
  selectRegion.addEventListener('change', function (e) {
    const regionSeleccionada = e.target.value;
    selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

    if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
      comunasPorRegion[regionSeleccionada].forEach(comuna => {
        const opcion = document.createElement('option');
        opcion.value = comuna;
        opcion.textContent = comuna;
        selectComuna.appendChild(opcion);
      });
    }
  });

  // Submit del formulario
  formRegistro.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre');
    const correo = document.querySelector('#correo');
    const confirmarCorreo = document.querySelector('#confirmar-correo');
    const password = document.querySelector('#password');
    const confirmarPassword = document.querySelector('#confirmar-password');
    const region = document.querySelector('#region');
    const comuna = document.querySelector('#comuna');
    const mensajeEstado = document.querySelector('#mensaje-estado');

    let formularioValido = true;
    let mensajeError = CONFIG_PUBLICO.mensajes.camposObligatorios;

    // Validación de campos vacíos
    if (!validarCampo(nombre)) formularioValido = false;
    if (!validarCampo(region)) formularioValido = false;
    if (!validarCampo(comuna)) formularioValido = false;
    if (!validarCampo(password)) formularioValido = false;

    // Validación de contraseñas
    if (!validarCampo(confirmarPassword) || confirmarPassword.value.trim() !== password.value.trim()) {
      confirmarPassword.classList.add('campo-error');
      formularioValido = false;
      mensajeError = CONFIG_PUBLICO.mensajes.passwordsNoCoinciden;
    } else {
      confirmarPassword.classList.remove('campo-error');
    }

    // Validación de correo formato
    if (!validarCorreo(correo)) {
      formularioValido = false;
      mensajeError = CONFIG_PUBLICO.mensajes.correoInvalido;
    }

    // Validación de confirmación de correo
    if (!validarCampo(confirmarCorreo) || confirmarCorreo.value.trim() !== correo.value.trim()) {
      confirmarCorreo.classList.add('campo-error');
      formularioValido = false;
      if (patronCorreo.test(correo.value.trim())) {
        mensajeError = CONFIG_PUBLICO.mensajes.correosNoCoinciden;
      }
    } else {
      confirmarCorreo.classList.remove('campo-error');
    }

    if (formularioValido) {
      mostrarMensaje(mensajeEstado, CONFIG_PUBLICO.mensajes.exitoRegistro, true);
      formRegistro.reset();
    } else {
      mostrarMensaje(mensajeEstado, mensajeError, false);
    }
  });
}