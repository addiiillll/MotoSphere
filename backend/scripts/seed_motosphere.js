import mongoose from "mongoose";
import dotenv from "dotenv";
import Brand from "../src/models/Brand.js";
import Motorcycle from "../src/models/Motorcycle.js";
import slugify from "slugify";

dotenv.config();

const brands = [
    { name: "Yamaha", originCountry: "Japan", isFeatured: true },
    { name: "Honda", originCountry: "Japan", isFeatured: true },
    { name: "Ducati", originCountry: "Italy", isFeatured: true },
    { name: "Harley-Davidson", originCountry: "USA", isFeatured: true },
];

const motorcycles = [
    {
        modelName: "Yamaha YZF-R1",
        brandName: "Yamaha",
        price: 17399,
        type: "Sport",
        displacement: 998,
        description: "The R1 has been the flagship of Yamaha's sportbike lineup for decades.",
        images: ["https://images.unsplash.com/photo-1558981403-c5f91eb1c084"],
        isHighlighted: true,
    },
    {
        modelName: "Honda CB650R",
        brandName: "Honda",
        price: 9399,
        type: "Naked",
        displacement: 649,
        description: "The CB650R features a minimalist Neo-Sports Café design.",
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f"],
        isLatest: true,
    },
    {
        modelName: "Ducati Panigale V4",
        brandName: "Ducati",
        price: 24495,
        type: "Sport",
        displacement: 1103,
        description: "The Panigale V4 replaces the iconic 1299 at the top of the Ducati supersport range.",
        images: ["https://images.unsplash.com/photo-1568772585407-9363f9bf3a87"],
        isHighlighted: true,
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data
        await Brand.deleteMany({});
        await Motorcycle.deleteMany({});

        // Seed Brands
        const createdBrands = await Brand.insertMany(brands);
        console.log("Brands seeded!");

        // Seed Motorcycles
        for (const bike of motorcycles) {
            const brand = createdBrands.find((b) => b.name === bike.brandName);
            if (brand) {
                await Motorcycle.create({
                    ...bike,
                    brand: brand._id,
                    slug: slugify(bike.modelName, { lower: true }),
                });
            }
        }
        console.log("Motorcycles seeded!");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
