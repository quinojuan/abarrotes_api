import { Router } from "express";
import { reporteDeInventario, updateProduct, ajustarProduct } from "../controllers/inventario.controller.js";

const router = Router();

router.get("/", reporteDeInventario);
router.post("/updateproduct", updateProduct)
router.post("/ajustar", ajustarProduct)

export default router;