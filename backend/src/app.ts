import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
// import authRoutes from "./routes/authRoutes";
// import mindmapRoutes from "./routes/mindmapRoutes";
import getRouteList from "./utils/getRouteList";

dotenv.config();

const app: Express = express();
// connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/mindmaps", mindmapRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// console.log(getRouteList(app));
