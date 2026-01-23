import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const createGeospatialIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const db = mongoose.connection.db;
        await db.collection('stations').createIndex({ "location": "2dsphere" });
        
        console.log('✅ Geospatial index created successfully on stations collection');
        process.exit(0);
    } catch (error) {
        if (error.code === 85) {
            console.log('✅ Geospatial index already exists');
            process.exit(0);
        } else {
            console.error('❌ Error creating geospatial index:', error.message);
            process.exit(1);
        }
    }
};

createGeospatialIndex();