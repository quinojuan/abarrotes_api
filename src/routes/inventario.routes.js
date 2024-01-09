import { Router } from "express";
import { reporteDeInventario } from "../controllers/inventario.controller.js";

const router = Router();

router.get("/", reporteDeInventario);

export default router;