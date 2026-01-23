import express from "express";
import {
    getMotorcycles,
    createMotorcycle,
    getMotorcycleBySlug,
    updateMotorcycle,
    deleteMotorcycle,
} from "../controllers/motorcycle.controllers.js";

const router = express.Router();

router.route("/").get(getMotorcycles).post(createMotorcycle);
router.route("/slug/:slug").get(getMotorcycleBySlug);
router.route("/:id").put(updateMotorcycle).delete(deleteMotorcycle);

export default router;
