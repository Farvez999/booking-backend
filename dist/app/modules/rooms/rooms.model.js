"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    images: [
        {
            url: String,
            publicLink: String,
        },
    ],
    facilities: [
        {
            type: String,
        },
    ],
    building: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "service",
    },
    roomId: {
        type: String,
    },
    forCheck: {
        type: String,
        default: "rooms",
    },
    discount: {
        type: Number,
    },
    category: {
        type: String,
        enum: ["delux", "delux king", "delux twin", "3 bed"],
    },
    bedSize: {
        type: Number,
    },
    pricing: {
        type: Number,
    },
    roomSize: {
        type: String,
    },
    description: {
        type: String,
    },
    isBooked: {
        type: Boolean,
        default: false,
    },
    reviewAndRatings: [
        {
            rating: Number,
            message: String,
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
}, {
    timestamps: true,
});
const Room = (0, mongoose_1.model)("room", RoomSchema);
exports.default = Room;
