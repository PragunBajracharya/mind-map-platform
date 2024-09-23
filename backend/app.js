const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const mindmapRoutes = require("./routes/mindmapRoutes");
const getRouteList = require("./utils/getRouteList");

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mindmaps", mindmapRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

console.log(getRouteList(app));


