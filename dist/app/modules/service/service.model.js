"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const service_constant_1 = require("./service.constant");
const ServiceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    code: {
        type: String,
    },
    forCheck: {
        type: String,
        default: "building",
    },
    location: {
        type: String,
        enum: service_constant_1.LocationEnum,
        required: [true, "location category is required"],
    },
    locationInDetails: {
        type: String,
        required: [true, "location in details is required"],
    },
    category: {
        type: String,
        enum: [
            "hotels",
            "apartments",
            "resorts",
            "villas",
            "vacationHome",
            "guestHouse",
        ],
    },
    description: {
        type: String,
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
    minPriceRange: {
        type: String,
        default: 0,
    },
    maxPriceRange: {
        type: String,
        default: 0,
    },
    status: {
        type: String,
        enum: ["in progress", "upcoming"],
        default: "in progress",
    },
    comments: {
        type: String,
    },
    rooms: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "room",
        },
    ],
}, {
    timestamps: true,
});
// room Schema
const Service = (0, mongoose_1.model)("service", ServiceSchema);
exports.default = Service;
