import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role });
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json({
        success: true,
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            location: user.location
        }
    });
};

export const updateLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;

        await User.findByIdAndUpdate(req.user._id, {
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        });

        res.json({ success: true, message: 'Location updated successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Email already in use' });
            }
            user.email = email;
        }

        if (name) user.name = name;
        await user.save();

        res.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            message: 'Profile updated successfully'
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
