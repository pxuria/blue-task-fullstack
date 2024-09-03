import express from "express";
import { createFacilityType, getAllFacilityTypes } from "../controllers/facilityTypesController.js";

const router = express.Router();
router.route("/").post(createFacilityType).get(getAllFacilityTypes);

export default router;
