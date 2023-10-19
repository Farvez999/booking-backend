"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const router = express_1.default.Router();
router.post("/", service_controller_1.ServiceController.createAbuilding);
router.get("/", service_controller_1.ServiceController.getAllBuildings);
router.get("/:id", service_controller_1.ServiceController.getSingleBuilding);
router.patch("/:id", service_controller_1.ServiceController.updateBuilding);
router.delete("/:id", service_controller_1.ServiceController.deleteBuilding);
exports.serviceRoutes = router;
