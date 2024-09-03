import express from "express";
import { createFacility, getFacilities } from "../controllers/facilityController.js";

const router = express.Router();

router.route("/").post(createFacility).get(getFacilities);

export default router;
