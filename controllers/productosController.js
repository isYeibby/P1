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
