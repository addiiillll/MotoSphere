import Motorcycle from "../models/Motorcycle.js";
import slugify from "slugify";

export const getMotorcycles = async (req, res) => {
    try {
        const { brand, type, minPrice, maxPrice, displacement, isLatest, isHighlighted } = req.query;
        let query = {};

        if (brand) query.brand = brand;
        if (type) query.type = type;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (displacement) query.displacement = { $gte: Number(displacement) };
        if (isLatest) query.isLatest = isLatest === "true";
        if (isHighlighted) query.isHighlighted = isHighlighted === "true";

        const motorcycles = await Motorcycle.find(query).populate("brand");
        res.status(200).json(motorcycles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMotorcycle = async (req, res) => {
    try {
        const { modelName } = req.body;
        const slug = slugify(modelName, { lower: true });
        const motorcycle = await Motorcycle.create({ ...req.body, slug });
        res.status(201).json(motorcycle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getMotorcycleBySlug = async (req, res) => {
    try {
        const motorcycle = await Motorcycle.findOne({ slug: req.params.slug }).populate("brand");
        if (!motorcycle) return res.status(404).json({ message: "Motorcycle not found" });
        res.status(200).json(motorcycle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMotorcycle = async (req, res) => {
    try {
        if (req.body.modelName) {
            req.body.slug = slugify(req.body.modelName, { lower: true });
        }
        const motorcycle = await Motorcycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!motorcycle) return res.status(404).json({ message: "Motorcycle not found" });
        res.status(200).json(motorcycle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteMotorcycle = async (req, res) => {
    try {
        const motorcycle = await Motorcycle.findByIdAndDelete(req.params.id);
        if (!motorcycle) return res.status(404).json({ message: "Motorcycle not found" });
        res.status(200).json({ message: "Motorcycle deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
