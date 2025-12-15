import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import hyperRouter from "./routes/hyper.router";
dotenv.config();

const app = express();

//middleware
app.use(cors()); //allows frontend to talk to backend, to tell which websites are allowed to make req to my backend
app.use(express.json());

//health check route
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/hyper", hyperRouter);

//start server
//const PORT = process.env.PORT || 8000;

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})