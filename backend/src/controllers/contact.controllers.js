import Contact from "../models/Contact.js";

export const submitFeedback = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ message: "Feedback submitted successfully", contact });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateInquiryStatus = async (req, res) => {
    try {
        const inquiry = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
        res.status(200).json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
