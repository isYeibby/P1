const db = require('../db/database');

class Producto {
    static getAll(callback) {
        db.all("SELECT * FROM productos", callback);
    }

    static getById(id, callback) {
        db.get("SELECT * FROM productos WHERE id = ?", [id], callback);
    }

    static create(nuevoProducto, callback) {
        const { nombre, descripcion } = nuevoProducto;
        db.run("INSERT INTO productos (nombre, descripcion) VALUES (?, ?)", [nombre, descripcion], function(err) {
            if (err) {
                callback(err);
            }
            nuevoProducto.id = this.lastID;
            callback(null, nuevoProducto);   
        });          
    }

    static update(id, productoActualizado, callback) {
        const { nombre, descripcion } = productoActualizado;
        db.run(
            "UPDATE productos SET nombre = ?, descripcion = ? WHERE id = ?",
            [nombre, descripcion, id],
            function(err) {
                if (err) {
                    callback(err);
                } else if (this.changes === 0) {
                    callback(new Error("Producto no encontrado"));
                } else {
                    productoActualizado.id = id;
                    callback(null, productoActualizado);
                }
            }
        );
    }

    static delete(id, callback) {
        db.run("DELETE FROM productos WHERE id = ?", [id], function(err) {
            if (err) {
                callback(err, null);
            } else if (this.changes === 0) {
                callback(new Error("Producto no encontrado"), null);
            } else {
                callback(null, { message: "Producto eliminado" });
            }
        });
    }
}
 
module.exports = Producto;