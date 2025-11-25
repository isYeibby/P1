const db = require('../db/database');

class Producto {
    static getAll(callback) {
        db.all("SELECT * FROM productos",callback);
    }

    static getById(id, callback) {
        db.get("SELECT * FROM productos WHERE id = ?", [id], callback);
    }
 }
 
module.exports = Producto;