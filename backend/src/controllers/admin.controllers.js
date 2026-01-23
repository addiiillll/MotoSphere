import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const { role, search } = req.query;
        let query = {};

        if (role) {
            query.role = role;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(query).select('-password').sort({ createdAt: -1 });

        res.json({
            success: true,
            users: users
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        res.json({
            success: true,
            data: {
                totalUsers,
                totalAlerts: 0 // Placeholder
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};