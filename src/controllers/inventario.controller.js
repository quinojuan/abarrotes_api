import { pool } from "../db.js"

export const reporteDeInventario = async (req, res) => {
  const [rows] = await pool.query(`SELECT SUM(precio_costo * cantidad_actual) AS subtotal FROM Productos;`)
  const { subtotal } = rows[0]
  const [rows2] = await pool.query(`SELECT SUM(cantidad_actual) AS cantidadProductos FROM Productos;`)
  const { cantidadProductos } = rows2[0]

  res.json({
    "costo_de_inventario": subtotal,
    "cantidad_de_productos": cantidadProductos
  })
}

export const updateProduct = async (req, res) => {
  try {
    const { codigo_de_barras, cantidad_a_agregar } = req.body

    if (cantidad_a_agregar < 0) {
      console.log("La cantidad no puede ser menor a 0") // me falta agregar una validacion en el front para evitar numeros negativos
      return res.status(500).json("La cantidad no puede ser menor a 0")
    }
    // Verifico si el producto existe
    const [productoExistente] = await pool.query("SELECT * FROM productos WHERE codigo_de_barras = ?", [codigo_de_barras])

    if (productoExistente.length === 0) {
      return res.status(404).json("No se encontró el producto")
    }
    // Obtengo la cantidad actual y calculo la nueva cantidad
    const cantidad_actual = productoExistente[0].cantidad_actual
    const nueva_cantidad = cantidad_actual + parseInt(cantidad_a_agregar)

    // Actualizar la cantidad actual en la base de datos
    await pool.query("UPDATE productos SET cantidad_actual = ? WHERE codigo_de_barras = ?", [nueva_cantidad, codigo_de_barras])

    res.json({ message: `Cantidad actualizada correctamente. Nuevo total: ${nueva_cantidad}` })
  } catch (error) {
    console.log("Error al cargar la cantidad", error)
    res.status(500).json({ message: "Error interno del servidor" })
  }
}

export const ajustarProduct = async (req, res) => {
  try {
    const { codigo_de_barras, cantidad_a_ajustar } = req.body

    if (cantidad_a_ajustar < 0) {
      console.log("La cantidad no puede ser menor a 0") // me falta agregar una validacion en el front para evitar numeros negativos
      return res.status(500).json("La cantidad no puede ser menor a 0")
    }
    // Verifico si el producto existe
    const [productoExistente] = await pool.query("SELECT * FROM productos WHERE codigo_de_barras = ?", [codigo_de_barras])

    if (productoExistente.length === 0) {
      return res.status(404).json("No se encontró el producto")
    }
    // Obtengo la cantidad actual y calculo la nueva cantidad
    

    // Actualizar la cantidad actual en la base de datos
    await pool.query("UPDATE productos SET cantidad_actual = ? WHERE codigo_de_barras = ?", [cantidad_a_ajustar, codigo_de_barras])

    res.json({ message: `Cantidad actualizada correctamente. Nueva cantidad: ${productoExistente.cantidad_actual}` })
  } catch (error) {
    console.log("Error al cargar la cantidad", error)
    res.status(500).json({ message: "Error interno del servidor" })
  }
}