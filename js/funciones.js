/* Inicializador y validaciones de formularios */
document.addEventListener('DOMContentLoaded', function () {

  /* configuración centralizada */
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

  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const comunasPorRegion = {
    "Metropolitana": ["Santiago", "Providencia", "San Bernardo", "Maipú"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"]
  };

  /* 1. Formulario de contacto */
  const formContacto = document.querySelector('#formulario-contacto');

  if (formContacto) {
    formContacto.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre = document.querySelector('#nombre');
      const correo = document.querySelector('#correo');
      const contenido = document.querySelector('#contenido');
      const mensajeEstado = document.querySelector('#mensaje-estado');

      let formularioValido = true;
      let mensajeError = CONFIG_PUBLICO.mensajes.camposObligatorios;

      if (nombre.value.trim() === '') {
        nombre.classList.add('campo-error');
        formularioValido = false;
      } else {
        nombre.classList.remove('campo-error');
      }

      if (contenido.value.trim() === '') {
        contenido.classList.add('campo-error');
        formularioValido = false;
      } else {
        contenido.classList.remove('campo-error');
      }

      if (!patronCorreo.test(correo.value.trim())) {
        correo.classList.add('campo-error');
        formularioValido = false;
        mensajeError = CONFIG_PUBLICO.mensajes.correoInvalido;
      } else {
        correo.classList.remove('campo-error');
      }

      if (formularioValido) {
        mensajeEstado.textContent = CONFIG_PUBLICO.mensajes.exitoContacto;
        mensajeEstado.classList.remove('error');
        mensajeEstado.classList.add('exito');
        formContacto.reset();
      } else {
        mensajeEstado.textContent = mensajeError;
        mensajeEstado.classList.remove('exito');
        mensajeEstado.classList.add('error');
      }
    });
  }

  /* 2. Formulario de inicio de sesión */
  const formInicio = document.querySelector('#formulario-inicio');

  if (formInicio) {
    formInicio.addEventListener('submit', function (e) {
      e.preventDefault();

      const correo = document.querySelector('#correo');
      const password = document.querySelector('#password');
      const mensajeEstado = document.querySelector('#mensaje-estado');

      let formularioValido = true;
      let mensajeError = CONFIG_PUBLICO.mensajes.camposObligatorios;

      if (password.value.trim() === '') {
        password.classList.add('campo-error');
        formularioValido = false;
      } else {
        password.classList.remove('campo-error');
      }

      if (!patronCorreo.test(correo.value.trim())) {
        correo.classList.add('campo-error');
        formularioValido = false;
        mensajeError = CONFIG_PUBLICO.mensajes.correoInvalido;
      } else {
        correo.classList.remove('campo-error');
      }

      if (formularioValido) {
        mensajeEstado.textContent = CONFIG_PUBLICO.mensajes.exitoContacto;
        mensajeEstado.classList.remove('error');
        mensajeEstado.classList.add('exito');
        formContacto.reset();
      } else {
        mensajeEstado.textContent = mensajeError;
        mensajeEstado.classList.remove('exito');
        mensajeEstado.classList.add('error');
      }
    });
  }

  /* 3. Formulario de registro */
  const formRegistro = document.querySelector('#formulario-registro');

  if (formRegistro) {
    const selectRegion = document.querySelector('#region');
    const selectComuna = document.querySelector('#comuna');

    Object.keys(comunasPorRegion).forEach(function (region) {
      const opcion = document.createElement('option');
      opcion.value = region;
      opcion.textContent = region;
      selectRegion.appendChild(opcion);
    });

    selectRegion.addEventListener('change', function (e) {
      const regionSeleccionada = e.target.value;
      selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

      if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
        comunasPorRegion[regionSeleccionada].forEach(function (comuna) {
          const opcion = document.createElement('option');
          opcion.value = comuna;
          opcion.textContent = comuna;
          selectComuna.appendChild(opcion);
        });
      }
    });

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

      if (nombre.value.trim() === '') {
        nombre.classList.add('campo-error');
        formularioValido = false;
      } else {
        nombre.classList.remove('campo-error');
      }

      if (region.value === '') {
        region.classList.add('campo-error');
        formularioValido = false;
      } else {
        region.classList.remove('campo-error');
      }

      if (comuna.value === '') {
        comuna.classList.add('campo-error');
        formularioValido = false;
      } else {
        comuna.classList.remove('campo-error');
      }

      if (password.value.trim() === '') {
        password.classList.add('campo-error');
        formularioValido = false;
      } else {
        password.classList.remove('campo-error');
      }

      if (confirmarPassword.value.trim() === '' || confirmarPassword.value.trim() !== password.value.trim()) {
        confirmarPassword.classList.add('campo-error');
        formularioValido = false;
        mensajeError = CONFIG_PUBLICO.mensajes.passwordsNoCoinciden;
      } else {
        confirmarPassword.classList.remove('campo-error');
      }

      if (!patronCorreo.test(correo.value.trim())) {
        correo.classList.add('campo-error');
        formularioValido = false;
        mensajeError = CONFIG_PUBLICO.mensajes.correoInvalido;
      } else {
        correo.classList.remove('campo-error');
      }

      if (confirmarCorreo.value.trim() === '' || confirmarCorreo.value.trim() !== correo.value.trim()) {
        confirmarCorreo.classList.add('campo-error');
        formularioValido = false;
        if (patronCorreo.test(correo.value.trim())) {
          mensajeError = CONFIG_PUBLICO.mensajes.correosNoCoinciden;
        }
      } else {
        confirmarCorreo.classList.remove('campo-error');
      }

      if (formularioValido) {
        mensajeEstado.textContent = CONFIG_PUBLICO.mensajes.exitoContacto;
        mensajeEstado.classList.remove('error');
        mensajeEstado.classList.add('exito');
        formContacto.reset();
      } else {
        mensajeEstado.textContent = mensajeError;
        mensajeEstado.classList.remove('exito');
        mensajeEstado.classList.add('error');
      }
    });
  }

  

/* 4. Formulario de creación de usuario */

const formUsuario = document.querySelector('#formulario-usuario');

if (formUsuario) {

    const run = document.querySelector('#run');
    const nombre = document.querySelector('#nombre');
    const apellidos = document.querySelector('#apellidos');
    const correo = document.querySelector('#correo');
    const tipoUsuario = document.querySelector('#tipo-usuario');
    const region = document.querySelector('#region');
    const comuna = document.querySelector('#comuna');
    const direccion = document.querySelector('#direccion');
    const confirmacion = document.querySelector('#confirmacion');

    const comunasPorRegion = {
        "Metropolitana": [
            "Santiago",
            "Providencia",
            "San Bernardo",
            "Maipú"
        ],
        "Valparaíso": [
            "Valparaíso",
            "Viña del Mar",
            "Quilpué"
        ]
    };


    /* Reiniciar selección de comuna */

    function reiniciarComuna() {

        comuna.replaceChildren();

        const opcionInicial = document.createElement('option');

        opcionInicial.value = '';
        opcionInicial.textContent = 'Seleccione una comuna';

        comuna.appendChild(opcionInicial);

        comuna.disabled = true;
    }


    /* Cargar regiones */

    Object.keys(comunasPorRegion).forEach(function (regionNombre) {

        const opcion = document.createElement('option');

        opcion.value = regionNombre;
        opcion.textContent = regionNombre;

        region.appendChild(opcion);
    });


    /* Actualizar comunas */

    region.addEventListener('change', function () {

        reiniciarComuna();

        if (comunasPorRegion[region.value]) {

            comunasPorRegion[region.value].forEach(function (comunaNombre) {

                const opcion = document.createElement('option');

                opcion.value = comunaNombre;
                opcion.textContent = comunaNombre;

                comuna.appendChild(opcion);
            });

            comuna.disabled = false;
        }
    });


    /* Validar RUN */

    function validarRun(valor) {

        valor = valor.trim().toUpperCase();

        if (!/^[0-9]{6,8}[0-9K]$/.test(valor)) {
            return false;
        }

        const cuerpo = valor.slice(0, -1);
        const digitoVerificador = valor.slice(-1);

        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {

            suma += Number(cuerpo[i]) * multiplicador;

            multiplicador++;

            if (multiplicador > 7) {
                multiplicador = 2;
            }
        }

        const resto = 11 - (suma % 11);

        let digitoCalculado;

        if (resto === 11) {
            digitoCalculado = '0';
        } else if (resto === 10) {
            digitoCalculado = 'K';
        } else {
            digitoCalculado = String(resto);
        }

        return digitoCalculado === digitoVerificador;
    }


    /* Validar correo permitido */

    function validarCorreoUsuario(valor) {

        return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/
            .test(valor.trim());
    }


    /* Validar formulario */

    formUsuario.addEventListener('submit', function (e) {

        e.preventDefault();

        let formularioValido = true;
        let mensajeError = CONFIG_PUBLICO.mensajes.camposObligatorios;


        /* Validar RUN */

        if (!validarRun(run.value)) {

            run.classList.add('campo-error');

            formularioValido = false;
            mensajeError = 'Ingresa un RUN válido.';

        } else {

            run.classList.remove('campo-error');
        }


        /* Validar campos obligatorios */

        [nombre, apellidos, tipoUsuario, region, comuna, direccion]
            .forEach(function (campo) {

                if (!validarCampo(campo)) {
                    formularioValido = false;
                }
            });


        /* Validar correo */

        if (!validarCorreoUsuario(correo.value)) {

            correo.classList.add('campo-error');

            formularioValido = false;
            mensajeError =
                'El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.';

        } else {

            correo.classList.remove('campo-error');
        }


        /* Resultado */

        if (formularioValido) {

            confirmacion.textContent =
            'Usuario registrado correctamente.';

            confirmacion.classList.remove('error');
            confirmacion.classList.add('exito');

            formUsuario.reset();

            reiniciarComuna();

        } else {

            confirmacion.textContent = mensajeError;

            confirmacion.classList.remove('exito');
            confirmacion.classList.add('error');
        }
    });
  }
});
    

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
