import { pool } from "../db.js";

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Productos")
    res.json(rows)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      codigoDeBarras,
      comoSeVende,
      descripcion,
      precioCosto,
      precioVenta,
      precioMayor,
      departamento,
      utilizaInventario,
      cantidadActual,
      minimo,
    } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Productos (codigo_de_barras, como_se_vende, descripcion, precio_costo, precio_venta, precio_mayor, departamento, utiliza_inventario, cantidad_actual, minimo ) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        codigoDeBarras,
        comoSeVende,
        descripcion,
        precioCosto,
        precioVenta,
        precioMayor,
        departamento,
        utilizaInventario,
        cantidadActual,
        minimo,
      ]
    );
    console.log(rows);
    res.json("Producto creado correctamente");
  } catch (error) {
    console.log("Algo salió mal...");
    res.status(500).json({message: "Algo salió mal...", error: error.message});
  }
};
