const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);

module.exports = router;