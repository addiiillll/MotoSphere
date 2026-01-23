import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`🗄️ MongoDB connected: ${conn.connection.host}`);
        
        // Ensure geospatial index exists
        await createGeospatialIndex(conn.connection.db);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

const createGeospatialIndex = async (db) => {
    try {
        await db.collection('stations').createIndex({ "location": "2dsphere" });
        console.log('✅ Geospatial index created on stations collection');
    } catch (error) {
        if (error.code === 85) {
            console.log('✅ Geospatial index already exists');
        } else {
            console.error('❌ Error creating geospatial index:', error.message);
        }
    }
};

export default connectDB;
