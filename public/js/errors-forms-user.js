window.addEventListener('load', function () {
    let formulario = document.querySelector(".e-form");
    let email = document.querySelector(".e-email");
    let password = document.querySelector(".e-password");

    let errorEmail = document.createElement('span');
    let errorPassword = document.createElement('span');

    errorEmail.classList.add('mensaje-error');
    errorPassword.classList.add('mensaje-error');

    email.parentNode.insertBefore(errorEmail, email.nextSibling);
    password.parentNode.insertBefore(errorPassword, password.nextSibling);

    // Función para validar email
    function validarEmail(email) {
        // Expresión regular para validar email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    email.addEventListener('input', function () {
        let emailV = email.value.trim();

        if (!validarEmail(emailV)) {
            errorEmail.textContent = 'Email inválido';
        } else {
            errorEmail.textContent = '';
        }
    });

    password.addEventListener('input', function () {
        let passwordV = password.value.trim();

        if (passwordV.length < 6) {
            errorPassword.textContent = 'Mínimo 6 caracteres';
        } else {
            errorPassword.textContent = '';
        }
    });

    formulario.addEventListener('submit', function (event) {
        let errores = [];

        // PUSHEAMOS ERRORES
        if (email.value == "") {
            errores.push('Email Obligatorio');
        } else if (email.value.length < 5 || !validarEmail(email.value.trim())) {
            errores.push('Email inválido o demasiado corto');
        }

        if (password.value == "") {
            errores.push('Password Obligatorio');
        } else if (password.value.length < 6) {
            errores.push('Password debe contener al menos 6 caracteres');
        }

        // Tratamos errores
        if (errores.length > 0) {
            event.preventDefault();
            let ulErrores = document.querySelector(".errores-front ul");
            ulErrores.innerHTML = '';
            errores.forEach(error => {
                ulErrores.innerHTML += `<li>${error}</li>`;
            });

        }
        this.submit();
    });
});