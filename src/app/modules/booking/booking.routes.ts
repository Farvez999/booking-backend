import express from "express";
import { bookingControllers } from "./booking.controller";
const router = express.Router();
router.patch(
  "/reset-status/:id",
  bookingControllers.updateRoomBookingSchedulling
);
router.post("/:id", bookingControllers.createAbooking);
router.get("/", bookingControllers.getallBooking);
router.get("/:id", bookingControllers.getSingleBooking);
router.patch("/:id", bookingControllers.updateBooking);
router.delete("/:id", bookingControllers.deleteBooking);
router.patch("/cancel-booking/:id", bookingControllers.cancelBooking);

router.patch(
  "/update-status/:id",
  bookingControllers.updatebookingStatusByAdmin
);

export const bookingRouter = router;
