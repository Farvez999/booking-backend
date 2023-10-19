"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.patch("/reset-status/:id", booking_controller_1.bookingControllers.updateRoomBookingSchedulling);
router.post("/:id", booking_controller_1.bookingControllers.createAbooking);
router.get("/", booking_controller_1.bookingControllers.getallBooking);
router.get("/:id", booking_controller_1.bookingControllers.getSingleBooking);
router.patch("/:id", booking_controller_1.bookingControllers.updateBooking);
router.delete("/:id", booking_controller_1.bookingControllers.deleteBooking);
router.patch("/cancel-booking/:id", booking_controller_1.bookingControllers.cancelBooking);
router.patch("/update-status/:id", booking_controller_1.bookingControllers.updatebookingStatusByAdmin);
exports.bookingRouter = router;
