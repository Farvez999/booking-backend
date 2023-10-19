"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const mongoose_1 = require("mongoose");
const feedBackSchema = new mongoose_1.Schema({
    email: {
        type: String,
    },
    feedback: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
    },
}, {
    timestamps: true,
});
exports.Feedback = (0, mongoose_1.model)("feedback", feedBackSchema);
