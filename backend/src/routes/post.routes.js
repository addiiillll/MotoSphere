import express from "express";
import { getPosts, createPost, getPostBySlug, updatePost, deletePost } from "../controllers/post.controllers.js";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);
router.route("/slug/:slug").get(getPostBySlug);
router.route("/:id").put(updatePost).delete(deletePost);

export default router;
