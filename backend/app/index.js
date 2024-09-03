// packages
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

//utils
import connectDB from "./config/db.js";
import facilityRoutes from "./routes/facilityRoute.js";
import facilityTypesRoute from "./routes/facilityTypesRoute.js";

dotenv.config();

const port = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/facilities", facilityRoutes);
app.use("/api/facility-types", facilityTypesRoute);

app.listen(port, () => console.log(`Server running on port: ${port}`));
