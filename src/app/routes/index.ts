import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.route";
import { serviceRoutes } from "../modules/service/service.routes";
import { roomRoutes } from "../modules/rooms/rooms.routes";
import { bookingRouter } from "../modules/booking/booking.routes";
import {
  aboutUsRoutes,
  blogRoutes,
} from "../modules/contectManagement/content.routes";
import { faqRoutes } from "../modules/contectManagement/faqroutes";
import { feedbackRoutes } from "../modules/feedback/feedback.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/service",
    route: serviceRoutes,
  },
  {
    path: "/room",
    route: roomRoutes,
  },
  {
    path: "/booking",
    route: bookingRouter,
  },
  {
    path: "/content/aboutus",
    route: aboutUsRoutes,
  },
  {
    path: "/content/faq",
    route: faqRoutes,
  },
  {
    path: "/content/blog",
    route: blogRoutes,
  },
  {
    path: "/feedback",
    route: feedbackRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
