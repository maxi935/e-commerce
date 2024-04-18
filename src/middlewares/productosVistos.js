function productosVistos(req, res, next) {
    // Verificar si la cookie "vistos" existe
    if (!req.cookies.vistos) {
        // Si no existe, crearla con un array vacío y establecer la expiración 5 minutos después de cerrar la sesión
        const expirationDate = new Date(Date.now() + 5 * 60 * 1000); // Suma 5 minutos en milisegundos
        res.cookie('vistos', [], { expires: expirationDate, httpOnly: true });
    }

    // Obtener el array actual de "vistos" de la cookie
    const vistos = req.cookies.vistos || [];

    // Verificar si req.params.id no está en la lista
    if (!vistos.includes(req.params.id)) {
        // Si no está en la lista, agregarlo al array
        vistos.push(req.params.id);

        // Actualizar la cookie "vistos" con el nuevo array y mantener la expiración 5 minutos después de cerrar la sesión
        const expirationDate = new Date(Date.now() + 5 * 60 * 1000);
        res.cookie('vistos', vistos, { expires: expirationDate, httpOnly: true });
    }

    next();
}

module.exports = productosVistos;