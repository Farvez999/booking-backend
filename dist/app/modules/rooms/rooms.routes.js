"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const rooms_controller_1 = require("./rooms.controller");
const router = express_1.default.Router();
router.post("/", rooms_controller_1.roomController.createAroom);
router.get("/", rooms_controller_1.roomController.getallRooms);
router.get("/:id", rooms_controller_1.roomController.getsingleRooms);
router.patch("/:id", rooms_controller_1.roomController.updateRoom);
router.delete("/:id", rooms_controller_1.roomController.deleteRoom);
router.patch("/review/:id", rooms_controller_1.roomController.reviewAndRatings);
router.get("/review/:id", rooms_controller_1.roomController.reviewAndRatings);
router.patch("/addTocart/:id", rooms_controller_1.roomController.addTocart);
router.patch("/removefromcart/:id", rooms_controller_1.roomController.removeFromCart);
exports.roomRoutes = router;
