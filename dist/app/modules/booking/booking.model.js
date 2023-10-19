"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    user: {
        name: {
            type: String,
            required: [true, "email is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        phone: {
            type: String,
            required: [true, "phone is required"],
        },
        nidOrBirth: {
            type: String,
            required: [true, "nidOrBirth is required"],
        },
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
    room: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "room",
        required: true,
    },
    totalFee: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "closed"],
        default: "pending",
    },
    progresStatus: {
        type: String,
        enum: ["in progress", "upcoming"],
    },
    payType: {
        type: String,
        enum: ["bkash", "nagad", "card", "cash"],
    },
    payStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid",
    },
    bookingNo: {
        type: String,
    },
    forCheck: {
        type: String,
        default: "booking",
    },
}, {
    timestamps: true,
});
const Booking = (0, mongoose_1.model)("booking", BookingSchema);
exports.default = Booking;
