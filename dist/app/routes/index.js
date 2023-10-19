"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_route_1 = require("../modules/auth/auth.route");
const service_routes_1 = require("../modules/service/service.routes");
const rooms_routes_1 = require("../modules/rooms/rooms.routes");
const booking_routes_1 = require("../modules/booking/booking.routes");
const content_routes_1 = require("../modules/contectManagement/content.routes");
const faqroutes_1 = require("../modules/contectManagement/faqroutes");
const feedback_routes_1 = require("../modules/feedback/feedback.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/service",
        route: service_routes_1.serviceRoutes,
    },
    {
        path: "/room",
        route: rooms_routes_1.roomRoutes,
    },
    {
        path: "/booking",
        route: booking_routes_1.bookingRouter,
    },
    {
        path: "/content/aboutus",
        route: content_routes_1.aboutUsRoutes,
    },
    {
        path: "/content/faq",
        route: faqroutes_1.faqRoutes,
    },
    {
        path: "/content/blog",
        route: content_routes_1.blogRoutes,
    },
    {
        path: "/feedback",
        route: feedback_routes_1.feedbackRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
