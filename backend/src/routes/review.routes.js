import express from "express";
import {
    getMotorcycleReviews,
    getAllReviews,
    createReview,
    deleteReview,
} from "../controllers/review.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/motorcycle/:motorcycleId", getMotorcycleReviews);
router.get("/", authenticate, authorize('admin'), getAllReviews);
router.post("/", authenticate, createReview);
router.delete("/:id", authenticate, deleteReview);

export default router;
