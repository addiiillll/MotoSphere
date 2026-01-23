import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Post title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Post content is required"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ["Update", "Tip", "Buying Guide", "Review", "News"],
            default: "News",
        },
        tags: [String],
        slug: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
