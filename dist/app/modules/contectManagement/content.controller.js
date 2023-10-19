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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqController = exports.blogController = exports.aboutUsController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const content_service_1 = require("./content.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createAboutUs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.aboutusServices.createAboutUs(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "created  successfully",
        data: result,
    });
}));
const getAllAboutUs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.aboutusServices.getAllAboutUs();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "about us retrive  successfully",
        data: result,
    });
}));
const getSingleAboutUs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.aboutusServices.getSingleAboutUs(req.params.category);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "about us retrive  successfully",
        data: result,
    });
}));
const updateAboutUs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.aboutusServices.updateAboutUs(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "updateAboutUs  successfully",
        data: result,
    });
}));
const deleteAboutUs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.aboutusServices.deleteAboutUs(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "about us  successfully",
        data: result,
    });
}));
// blog
const createBlog = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.blogServices.createBlog(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "blog created  successfully",
        data: result,
    });
}));
const getallblogs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.blogServices.getallblogs();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "blog retrive  successfully",
        data: result,
    });
}));
const getsingleBlogs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.blogServices.getsingleBlogs(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "blog  retrive  successfully",
        data: result,
    });
}));
const updateBlogs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.blogServices.updateBlogs(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "blog update  successfully",
        data: result,
    });
}));
const deleteBlog = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.blogServices.deleteBlogs(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "blog deleted  successfully",
        data: result,
    });
}));
// faq
const createfaq = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.faqServices.createfaq(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "faq created  successfully",
        data: result,
    });
}));
const getgallfaqs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.faqServices.getgallfaqs();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "faq's retrive  successfully",
        data: result,
    });
}));
const getsinglefaqs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.faqServices.getsinglefaqs(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "faq retrive successfully",
        data: result,
    });
}));
const updatefaqs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.faqServices.updatefaqs(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "faq updated successfully",
        data: result,
    });
}));
const deletefaq = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_service_1.faqServices.deletefaqs(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "faq deleted   successfully",
        data: result,
    });
}));
exports.aboutUsController = {
    createAboutUs,
    getAllAboutUs,
    getSingleAboutUs,
    deleteAboutUs,
    updateAboutUs,
};
exports.blogController = {
    createBlog,
    getallblogs,
    getsingleBlogs,
    updateBlogs,
    deleteBlog,
};
exports.faqController = {
    createfaq,
    getgallfaqs,
    getsinglefaqs,
    updatefaqs,
    deletefaq,
};
