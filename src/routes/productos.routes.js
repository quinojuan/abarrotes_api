import { Router } from "express"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productos.controller.js";

const router = Router();

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.put("/updateproduct", updateProduct)
router.delete("/deleteproduct/:codigo_de_barras", deleteProduct)

export default router;
