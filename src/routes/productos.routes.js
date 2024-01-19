import { Router } from "express"
import { createProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productos.controller.js";

const router = Router();

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.put("/updateproduct", updateProduct)

export default router;
