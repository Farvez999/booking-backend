import express from "express";
import { ServiceController } from "./service.controller";

const router = express.Router();
router.post("/", ServiceController.createAbuilding);
router.get("/", ServiceController.getAllBuildings);
router.get("/:id", ServiceController.getSingleBuilding);
router.patch("/:id", ServiceController.updateBuilding);
router.delete("/:id", ServiceController.deleteBuilding);

export const serviceRoutes = router;
