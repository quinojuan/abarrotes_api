import { pool } from "../db.js"

export const reporteDeInventario = async (req, res) => {
  const [rows] = await pool.query(`SELECT SUM(precio_costo * cantidad_actual) AS subtotal FROM Productos;`)
  const {subtotal} = rows[0]
  const [rows2] = await pool.query(`SELECT SUM(cantidad_actual) AS cantidadProductos FROM Productos;`)
  const {cantidadProductos} = rows2[0]
  
  res.json({
    "costo_de_inventario": subtotal,
    "cantidad_de_productos": cantidadProductos
  })

}

export const updateProduct = async (req, res) => {
  const {codigo_de_barras, cantidad_a_agregar, descripcion, cantidad_actual } = req.body
  console.log({
    codigo_de_barras,
    descripcion,
    cantidad_actual,
    cantidad_a_agregar
  })
  res.json({
    codigo_de_barras,
    descripcion,
    cantidad_actual,
    cantidad_a_agregar
  })
}