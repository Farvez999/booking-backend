"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutUs = exports.Faq = exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    image: {
        url: String,
        public_id: String,
    },
    title: {
        type: String,
        required: [true, "title is required"],
    },
    description: {
        type: String,
        required: [true, "desc is required"],
    },
}, {
    timestamps: true,
});
const faqSchema = new mongoose_1.Schema({
    image: {
        url: String,
        publicLink: String,
    },
    title: {
        type: String,
        required: [true, "title is required"],
    },
    description: {
        type: String,
        required: [true, "desc is required"],
    },
}, {
    timestamps: true,
});
const AboutUsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    description: {
        type: String,
        required: [true, " idesc required"],
    },
}, {
    timestamps: true,
});
exports.Blog = (0, mongoose_1.model)("blog", BlogSchema);
exports.Faq = (0, mongoose_1.model)("faq", faqSchema);
exports.AboutUs = (0, mongoose_1.model)("about", AboutUsSchema);
