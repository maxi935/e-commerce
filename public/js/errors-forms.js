window.addEventListener('load', function () {
    //capturas con QUERY
    let formulario = document.querySelector(".e-form")
    let marca = document.querySelector(".e-marca")
    let tipo = document.querySelector(".e-tipo")
    let descripcion = document.querySelector(".e-descripcion")


    // Crear elementos para mostrar mensajes de error
    let errorMarca = document.createElement('span');
    let errorTipo = document.createElement('span');
    let errorDescripcion = document.createElement('span')

    // Agregar clases para estilos CSS
    errorMarca.classList.add('mensaje-error');
    errorTipo.classList.add('mensaje-error');
    errorDescripcion.classList.add('mensaje-error')

    // Insertar elementos de error después de los campos correspondientes
    marca.parentNode.insertBefore(errorMarca, marca.nextSibling);
    tipo.parentNode.insertBefore(errorTipo, tipo.nextSibling);
    descripcion.parentNode.insertBefore(errorDescripcion, descripcion.nextSibling);

    marca.addEventListener('input', function () {
        let marcaV = marca.value.trim();

        if (marcaV.length < 5) {
            errorMarca.textContent = '5 Carácteres o más';
        } else {
            errorMarca.textContent = '';
        }
    });

    tipo.addEventListener('input', function () {
        let tipoV = tipo.value.trim();

        if (tipoV.length < 5) {
            errorTipo.textContent = '5 Carácteres o más';
        } else {
            errorTipo.textContent = '';
        }
    });

    descripcion.addEventListener('input', function () {
        let descripcionV = descripcion.value.trim();

        if (descripcionV.length < 20) {
            errorDescripcion.textContent = '20 Carácteres o más';
        } else {
            errorDescripcion.textContent = '';
        }
    });


    formulario.addEventListener('submit', function (event) {
        let errores = [];

        //PUSHEAMOS ERRORES
        if (marca.value == "") {
            errores.push('Marca Obligatoria')
        } else if (marca.value.length < 5) {
            errores.push('Nombre debe contener mas de cinco carácteres')
        }

        if (tipo.value == "") {
            errores.push('Tipo Obligatorio')
        } else if (tipo.value.length < 5) {
            errores.push('Tipo debe contener mas de cinco carácteres')
        }

        if (descripcion.value == "") {
            errores.push('Descripción Obligatorio')
        } else if (descripcion.value.length < 20) {
            errores.push('Descripción debe contener mas de veinte carácteres')
        }

        //tratamos errores
        if (errores.length > 0) {
            event.preventDefault();
            let ulErrores = document.querySelector(".errores-front ul");
            ulErrores.innerHTML = '';
            errores.forEach(error => {
                ulErrores.innerHTML += `<li>${error}</li>`
            });

        }
        this.submit()
    })

})