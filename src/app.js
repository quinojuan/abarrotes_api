import express from "express";
import morgan from "morgan";
import indexRouter from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes a utilizar

app.use("/", indexRouter);
// app.use("/api", ventasRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
