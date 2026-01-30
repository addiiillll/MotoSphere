import express from "express";
import { submitFeedback, getAllInquiries, updateInquiryStatus } from "../controllers/contact.controllers.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").get(authenticate, authorize('admin'), getAllInquiries).post(submitFeedback);
router.route("/:id/status").put(authenticate, authorize('admin'), updateInquiryStatus);

export default router;
