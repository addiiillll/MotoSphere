import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Station from '../src/models/Station.js';

dotenv.config();

const generateSlugs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const stations = await Station.find({ $or: [{ slug: { $exists: false } }, { slug: null }] });
        console.log(`Found ${stations.length} stations without slugs`);

        for (const station of stations) {
            try {
                // Saving will trigger the pre-save hook to generate slug
                await station.save();
                console.log(`Generated slug for: ${station.name} -> ${station.slug}`);
            } catch (saveError) {
                console.error(`Failed to save station ${station.name} (${station._id}):`, saveError.message);
            }
        }

        console.log('Slug generation completed');
        process.exit(0);
    } catch (error) {
        console.error('Error generating slugs:', error);
        process.exit(1);
    }
};

generateSlugs();
