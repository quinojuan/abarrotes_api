import { Router } from "express";
import { reporteDeInventario, updateProduct } from "../controllers/inventario.controller.js";

const router = Router();

router.get("/", reporteDeInventario);
router.post("/updateproduct", updateProduct)

export default router;