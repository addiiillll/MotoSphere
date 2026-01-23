import Post from "../models/Post.js";
import slugify from "slugify";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title } = req.body;
        const slug = slugify(title, { lower: true });
        const post = await Post.create({ ...req.body, slug });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getPostBySlug = async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug }).populate("author", "name email");
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title, { lower: true });
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
