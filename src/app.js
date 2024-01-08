import express from "express"
import morgan from "morgan"

const app = express();


// Middlewares
app.use(morgan("dev"))
app.use(express.json())

// Routes a utilizar

// app.use("/", indexRoutes)
// app.use("/api", ventasRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" })
})

export default app;