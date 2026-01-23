import { Router } from "express";
import { getAllUsers, getAnalytics, getUserById } from "../controllers/admin.controllers.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", authenticate, authorize('admin'), getAllUsers);
router.get("/users/:id", authenticate, authorize('admin'), getUserById);
router.get("/analytics", authenticate, authorize('admin'), getAnalytics);

export default router;