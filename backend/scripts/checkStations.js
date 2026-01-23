import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const checkStations = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        const db = mongoose.connection.db;
        const stations = await db.collection('stations').find({}).toArray();
        
        console.log('Total stations:', stations.length);
        stations.forEach((station, index) => {
            console.log(`\nStation ${index + 1}:`);
            console.log('Name:', station.name);
            console.log('Location:', station.location);
            console.log('isVerified:', station.isVerified);
        });
        
        // Test the query with your coordinates
        const lat = 19.142377867042573;
        const lng = 72.84851369891453;
        const radius = 10000; // 10km in meters
        
        console.log('\n--- Testing Query ---');
        console.log('Query coordinates:', [lng, lat]);
        console.log('Radius:', radius, 'meters');
        
        const nearbyStations = await db.collection('stations').find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    $maxDistance: radius
                }
            },
            isVerified: true
        }).toArray();
        
        console.log('Nearby verified stations:', nearbyStations.length);
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

checkStations();