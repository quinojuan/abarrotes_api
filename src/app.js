import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRouter from "./routes/index.routes.js";
import productosRoutes from "./routes/productos.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Routes a utilizar

app.use("/", indexRouter);
app.use("/productos", productosRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
