import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

import authRouters from "./routes/authRoute.js";
app.use("/auth", authRouters);

import userRouters from "./routes/userRoute.js";
app.use("/api/users", userRouters);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "welcome to ecommerce api", status: true });
});

export default app;
