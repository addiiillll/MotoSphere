import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import brandRoutes from "./brand.routes.js";
import motorcycleRoutes from "./motorcycle.routes.js";
import postRoutes from "./post.routes.js";
import contactRoutes from "./contact.routes.js";
import reviewRoutes from "./review.routes.js";
import { Router } from "express";

const router = Router();

router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/brands", brandRoutes);
router.use("/motorcycles", motorcycleRoutes);
router.use("/posts", postRoutes);
router.use("/contacts", contactRoutes);
router.use("/reviews", reviewRoutes);

export default router;
