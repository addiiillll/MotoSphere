import Review from "../models/Review.js";

export const getMotorcycleReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ motorcycle: req.params.motorcycleId })
            .populate("user", "name")
            .sort("-createdAt");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("user", "name email")
            .populate("motorcycle", "modelName")
            .sort("-createdAt");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createReview = async (req, res) => {
    try {
        const { motorcycleId, rating, comment } = req.body;
        const review = await Review.create({
            user: req.user._id,
            motorcycle: motorcycleId,
            rating,
            comment,
        });

        const populatedReview = await Review.findById(review._id).populate("user", "name");
        res.status(201).json(populatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        // Only allow user to delete their own review or admin
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Not authorized to delete this review" });
        }

        await review.deleteOne();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
