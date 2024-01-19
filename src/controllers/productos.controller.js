import { pool } from "../db.js";

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Productos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM Productos WHERE codigo_de_barras = ?",
      [id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      codigo_de_barras,
      como_se_vende,
      descripcion,
      precio_costo,
      precio_venta,
      precio_mayor,
      departamento,
      utiliza_inventario,
      cantidad_actual,
      minimo,
    } = req.body;

    // Validar que todos los campos estén presentes y no son vacíos
    const requiredFields = [
      "codigo_de_barras",
      "como_se_vende",
      "descripcion",
      "precio_costo",
      "precio_venta",
      "precio_mayor",
      "departamento",
      "utiliza_inventario",
      "cantidad_actual",
      "minimo",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        console.log({ message: `El campo ${field} es obligatorio` });
        return res
          .status(400)
          .json({ message: `El campo ${field} es obligatorio` });
      }
    }
    const [rows] = await pool.query(
      "INSERT INTO productos (codigo_de_barras, como_se_vende, descripcion, precio_costo, precio_venta, precio_mayor, departamento, utiliza_inventario, cantidad_actual, minimo ) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        codigo_de_barras,
        como_se_vende,
        descripcion,
        precio_costo,
        precio_venta,
        precio_mayor,
        departamento,
        utiliza_inventario,
        cantidad_actual,
        minimo,
      ]
    );
    console.log(rows);
    res.json("Producto creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Algo salió mal...", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const {
      codigo_previo,
      cantidad_actual,
      codigo_de_barras,
      como_se_vende,
      departamento,
      descripcion,
      minimo,
      precio_costo,
      precio_mayor,
      precio_venta,
      utiliza_inventario,
    } = req.body;

    const productoUpdated = await pool.query(
      `UPDATE productos SET cantidad_actual = ?, codigo_de_barras = ?, como_se_vende = ?, departamento = ?, descripcion = ?, minimo = ?, precio_costo = ?, precio_mayor = ?, precio_venta = ?, utiliza_inventario = ? WHERE codigo_de_barras = ?`,
      [
        cantidad_actual,
        codigo_de_barras,
        como_se_vende,
        departamento,
        descripcion,
        minimo,
        precio_costo,
        precio_mayor,
        precio_venta,
        utiliza_inventario,
        codigo_previo
      ]
    );
    res.json(productoUpdated)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Algo salió mal...", error });
  }
};
