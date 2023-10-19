"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = exports.faqServices = exports.aboutusServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const content_model_1 = require("./content.model");
// about us
const createAboutUs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.AboutUs.create(payload);
    return result;
});
const getAllAboutUs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.AboutUs.find({});
    return result;
});
const getSingleAboutUs = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.AboutUs.findOne({ category: category });
    return result;
});
const deleteAboutUs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.AboutUs.findByIdAndDelete(id);
    return result;
});
const updateAboutUs = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.AboutUs.findByIdAndUpdate(id, {
        payload,
    }, {
        new: true,
    });
    return result;
});
// blog
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Blog.create(payload);
    return result;
});
const getallblogs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Blog.find({});
    return result;
});
const getsingleBlogs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Blog.findById(id);
    return result;
});
const deleteBlogs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Blog.findByIdAndDelete(id);
    return result;
});
const updateBlogs = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// about us
const createfaq = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Faq.create(payload);
    return result;
});
const getgallfaqs = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Faq.find({});
    return result;
});
const getsinglefaqs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Faq.findOne({ _id: id });
    return result;
});
const updatefaqs = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, id);
    const result = yield content_model_1.Faq.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    console.log(result);
    return result;
});
const deletefaqs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_model_1.Faq.findByIdAndDelete(id);
    return result;
});
exports.aboutusServices = {
    createAboutUs,
    getAllAboutUs,
    getSingleAboutUs,
    deleteAboutUs,
    updateAboutUs,
};
exports.faqServices = {
    createfaq,
    getgallfaqs,
    getsinglefaqs,
    updatefaqs,
    deletefaqs,
};
exports.blogServices = {
    createBlog,
    getallblogs,
    getsingleBlogs,
    updateBlogs,
    deleteBlogs,
};
