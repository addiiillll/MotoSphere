import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@openroad.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        const adminUser = new User({
            name: 'System Admin',
            email: adminEmail,
            password: adminPassword,
            role: 'admin'
        });

        await adminUser.save();
        console.log('Admin user seeded successfully');
        console.log('Email:', adminEmail);
        console.log('Password:', adminPassword);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
