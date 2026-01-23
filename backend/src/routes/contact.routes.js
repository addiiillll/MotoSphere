import express from "express";
import { submitFeedback, getAllInquiries, updateInquiryStatus } from "../controllers/contact.controllers.js";

const router = express.Router();

router.route("/").get(getAllInquiries).post(submitFeedback);
router.route("/:id/status").put(updateInquiryStatus);

export default router;
