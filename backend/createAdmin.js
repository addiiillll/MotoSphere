import mongoose from 'mongoose';
import User from './src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const adminData = {
            name: "Admin User",
            email: "admin@motosphere.com",
            password: "adminpassword123", // They should change this
            role: "admin"
        };

        const existing = await User.findOne({ email: adminData.email });
        if (existing) {
            existing.role = 'admin';
            await existing.save();
            console.log("Existing user promoted to admin:", adminData.email);
        } else {
            await User.create(adminData);
            console.log("New Admin created successfully:", adminData.email);
        }

        mongoose.connection.close();
    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
