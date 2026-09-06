/* Inicializador y validaciones de formularios */
document.addEventListener('DOMContentLoaded', function() {

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
    formContacto.addEventListener('submit', function(e) {
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
    formInicio.addEventListener('submit', function(e) {
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

    Object.keys(comunasPorRegion).forEach(function(region) {
      const opcion = document.createElement('option');
      opcion.value = region;
      opcion.textContent = region;
      selectRegion.appendChild(opcion);
    });

    selectRegion.addEventListener('change', function(e) {
      const regionSeleccionada = e.target.value;
      selectComuna.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

      if (regionSeleccionada && comunasPorRegion[regionSeleccionada]) {
        comunasPorRegion[regionSeleccionada].forEach(function(comuna) {
          const opcion = document.createElement('option');
          opcion.value = comuna;
          opcion.textContent = comuna;
          selectComuna.appendChild(opcion);
        });
      }
    });

    formRegistro.addEventListener('submit', function(e) {
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

});