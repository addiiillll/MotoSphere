import express from "express";
import {
    getMotorcycles,
    createMotorcycle,
    getMotorcycleBySlug,
    getMotorcycleById,
    updateMotorcycle,
    deleteMotorcycle,
} from "../controllers/motorcycle.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/")
    .get(getMotorcycles)
    .post(authenticate, authorize('admin'), createMotorcycle);

router.route("/slug/:slug").get(getMotorcycleBySlug);

router.route("/:id")
    .get(getMotorcycleById)
    .put(authenticate, authorize('admin'), updateMotorcycle)
    .delete(authenticate, authorize('admin'), deleteMotorcycle);

export default router;
