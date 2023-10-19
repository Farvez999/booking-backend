import express from "express";
import { faqController } from "./content.controller";
export const faqRoutes = express.Router();
faqRoutes.post("/", faqController.createfaq);
faqRoutes.get("/", faqController.getgallfaqs);
faqRoutes.get("/:id", faqController.getsinglefaqs);
faqRoutes.patch("/:id", faqController.updatefaqs);
faqRoutes.delete("/:id", faqController.deletefaq);
