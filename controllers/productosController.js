const Producto = require('../models/producto');

exports.getAllProductos = (req, res) => {
    Producto.getAll((err, productos) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(productos);
        }
    });
};

exports.getProductoById = (req, res) => {
    const id = req.params.id;
    Producto.getById(id, (err, producto) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else if (!producto) {
            res.status(404).json({error: 'Producto no encontrado'});
        } else {
            res.json(producto);
        }
    });
}

exports.createProducto = (req, res) => {
    const nuevoProducto = req.body;
    Producto.create(nuevoProducto, (err, productoCreado) => {
        if (err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json(productoCreado);
        }
    });
};

exports.updateProducto = (req, res) => {
    const id = req.params.id;
    const productoActualizado = req.body;
    Producto.update(id, productoActualizado, (err, producto) => {
        if (err) {
            if (err.message === "Producto no encontrado") {
                res.status(404).json({error: err.message});
            } else {
                res.status(500).json({error: err.message});
            }
        } else {
            res.json({
                mensaje: `Producto con id ${id} actualizado`,
                producto: producto
            });
        }
    });
};

exports.deleteProducto = (req, res) => {
    const id = req.params.id;
    Producto.delete(id, (err, result) => {
        if (err) {
            if (err.message === "Producto no encontrado") {
                res.status(404).json({error: err.message});
            } else {
                res.status(500).json({error: err.message});
            }
        } else {
            res.json(result);
        }
    });
};
