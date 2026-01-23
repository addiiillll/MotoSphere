import express from "express";
import { getBrands, createBrand, getBrandById, updateBrand, deleteBrand } from "../controllers/brand.controllers.js";
// import { protect, admin } from "../middlewares/auth.middleware.js"; // Assume these exist or will be refined

const router = express.Router();

router.route("/").get(getBrands).post(createBrand); // Add admin/protect middlewares later
router.route("/:id").get(getBrandById).put(updateBrand).delete(deleteBrand);

export default router;
