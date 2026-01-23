import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const verifyStation = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const db = mongoose.connection.db;
        const result = await db.collection('stations').updateMany(
            { isVerified: false },
            { $set: { isVerified: true } }
        );
        
        console.log(`✅ Verified ${result.modifiedCount} stations`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

verifyStation();