import mongoose from "mongoose";
import dotenv from "dotenv";
import Brand from "../src/models/Brand.js";
import Motorcycle from "../src/models/Motorcycle.js";
import slugify from "slugify";

dotenv.config();

const brands = [
    { name: "Kawasaki", originCountry: "Japan", isFeatured: true },
    { name: "BMW Motorrad", originCountry: "Germany", isFeatured: true },
    { name: "KTM", originCountry: "Austria", isFeatured: true },
    { name: "Ducati", originCountry: "Italy", isFeatured: true },
    { name: "Yamaha", originCountry: "Japan", isFeatured: true },
    { name: "Honda", originCountry: "Japan", isFeatured: true },
    { name: "Royal Enfield", originCountry: "India", isFeatured: true },
    { name: "Suzuki", originCountry: "Japan", isFeatured: true },
    { name: "Triumph", originCountry: "UK", isFeatured: true },
    { name: "Harley-Davidson", originCountry: "USA", isFeatured: true },
];

const motorcycles = [
    {
        modelName: "Kawasaki Ninja ZX-10R",
        brandName: "Kawasaki",
        price: 1679000,
        type: "Sport",
        displacement: 998,
        specifications: {
            engineType: "998cc, Liquid-cooled, 4-stroke, In-line Four",
            maxPower: "203 HP @ 13,200 rpm",
            maxTorque: "114.9 Nm @ 11,400 rpm",
            fuelCapacity: "17 Liters",
            weight: "207 kg",
            topSpeed: "299 km/h",
            seatHeight: "835 mm",
            gearbox: "6-speed",
            frontBrake: "Dual 330 mm discs",
            rearBrake: "Single 220 mm disc",
            abs: "KIBS",
            suspension: "Showa BFF",
        },
        features: ["Launch Control", "Traction Control", "Engine Brake Control", "Quick Shifter"],
        description: "The ZX-10R is a track-focused beast with WorldSBK DNA.",
        images: ["https://images.unsplash.com/photo-1622144702160-c3222304918e"],
        isHighlighted: true,
    },
    {
        modelName: "BMW S 1000 RR",
        brandName: "BMW Motorrad",
        price: 2075000,
        type: "Sport",
        displacement: 999,
        specifications: {
            engineType: "999cc, In-line 4-cylinder",
            maxPower: "210 HP @ 13,750 rpm",
            maxTorque: "113 Nm @ 11,000 rpm",
            fuelCapacity: "16.5 Liters",
            weight: "197 kg",
            topSpeed: "303 km/h",
            seatHeight: "824 mm",
            gearbox: "6-speed",
            frontBrake: "Twin disc 320 mm",
            rearBrake: "Single disc 220 mm",
            abs: "ABS Pro",
            suspension: "Upside-down fork",
        },
        features: ["Dynamic Traction Control", "Slide Control", "Shift Assistant Pro"],
        description: "Pure performance and technology on two wheels.",
        images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf815"],
        isLatest: true,
    },
    {
        modelName: "Ducati Panigale V4 S",
        brandName: "Ducati",
        price: 3348000,
        type: "Sport",
        displacement: 1103,
        specifications: {
            engineType: "1103cc, Desmosedici Stradale V4",
            maxPower: "215 HP @ 13,000 rpm",
            maxTorque: "123.6 Nm @ 9,500 rpm",
            fuelCapacity: "17 Liters",
            weight: "195.5 kg",
            topSpeed: "300+ km/h",
            seatHeight: "850 mm",
            gearbox: "6-speed with DQS",
            frontBrake: "2 x 330 mm discs, Brembo Stylema",
            rearBrake: "245 mm disc",
            abs: "Bosch Cornering ABS Evo",
            suspension: "Öhlins NPX 25/30 / TTX36",
        },
        features: ["Electronic Suspension", "Power Modes", "Ducati Data Analyzer", "Carbon Components"],
        description: "The closest thing to a MotoGP bike for the road.",
        images: ["https://images.unsplash.com/photo-1568772585407-9363f9bf3a87"],
        isHighlighted: true,
    },
    {
        modelName: "KTM 1290 Super Duke R",
        brandName: "KTM",
        price: 1950000,
        type: "Naked",
        displacement: 1301,
        specifications: {
            engineType: "1301cc, V-twin 75°",
            maxPower: "180 HP",
            maxTorque: "140 Nm",
            fuelCapacity: "16 Liters",
            weight: "189 kg",
            topSpeed: "289 km/h",
            seatHeight: "835 mm",
            gearbox: "6-speed",
            frontBrake: "Brembo Stylema",
            abs: "Bosch 9.1 MP",
            suspension: "WP APEX",
        },
        features: ["Supermoto ABS", "Traction Control", "MSR", "Quickshifter+"],
        description: "Raw, aggressive, and incredibly powerful. The Beast.",
        images: ["https://images.unsplash.com/photo-1635073908681-306ea6487928"],
        isHighlighted: true,
    },
    {
        modelName: "Yamaha YZF-R1M",
        brandName: "Yamaha",
        price: 2800000,
        type: "Sport",
        displacement: 998,
        specifications: {
            engineType: "998cc, Liquid-cooled, 4-stroke",
            maxPower: "200 HP",
            maxTorque: "112.4 Nm",
            fuelCapacity: "17 Liters",
            weight: "202 kg",
            topSpeed: "299 km/h",
            seatHeight: "860 mm",
            gearbox: "6-speed",
            frontBrake: "320 mm hydraulic disc",
            abs: "Brake Control System",
            suspension: "Öhlins ERS",
        },
        features: ["Carbon Fiber Body", "Communication Control Unit", "Power Delivery Mode"],
        description: "Yamaha's ultimate track weapon with GPS data logging.",
        images: ["https://images.unsplash.com/photo-1558981403-c5f91eb1c084"],
        isLatest: true,
    },
    {
        modelName: "Royal Enfield Interceptor 650",
        brandName: "Royal Enfield",
        price: 303000,
        type: "Naked",
        displacement: 648,
        specifications: {
            engineType: "648cc, Parallel twin, 4-stroke",
            maxPower: "47 HP @ 7,150 rpm",
            maxTorque: "52 Nm @ 5,250 rpm",
            fuelCapacity: "13.7 Liters",
            weight: "202 kg",
            topSpeed: "170 km/h",
            seatHeight: "804 mm",
            gearbox: "6-speed",
            frontBrake: "320 mm disc",
            rearBrake: "240 mm disc",
            abs: "Dual Channel ABS",
            suspension: "Telescopic fork / Twin shocks",
        },
        features: ["Retro Styling", "Slipper Clutch", "Cast Alloy Wheels"],
        description: "A modern classic that captures the spirit of the 1960s.",
        images: ["https://images.unsplash.com/photo-1593760411464-3fb865749742"],
        isHighlighted: true,
    },
    {
        modelName: "Suzuki Hayabusa",
        brandName: "Suzuki",
        price: 1690000,
        type: "Sport",
        displacement: 1340,
        specifications: {
            engineType: "1340cc, 4-cylinder, liquid-cooled",
            maxPower: "190 HP @ 9,700 rpm",
            maxTorque: "150 Nm @ 7,000 rpm",
            fuelCapacity: "20 Liters",
            weight: "264 kg",
            topSpeed: "299 km/h (limited)",
            seatHeight: "800 mm",
            gearbox: "6-speed",
            frontBrake: "320 mm discs, Brembo Stylema",
            abs: "Motion Track Brake System",
            suspension: "KYB inverted fork / Link-type shocks",
        },
        features: ["Bi-directional Quickshift", "Launch Control", "Anti-lift Control"],
        description: "The ultimate sportbike, redesigned for a new generation.",
        images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39"],
        isHighlighted: true,
    },
    {
        modelName: "Honda Gold Wing Tour",
        brandName: "Honda",
        price: 3920000,
        type: "Touring",
        displacement: 1833,
        specifications: {
            engineType: "1833cc, liquid-cooled, 6-cylinder",
            maxPower: "125 HP @ 5,500 rpm",
            maxTorque: "170 Nm @ 4,500 rpm",
            fuelCapacity: "21 Liters",
            weight: "390 kg",
            topSpeed: "180 km/h",
            seatHeight: "745 mm",
            gearbox: "7-speed DCT",
            frontBrake: "320 mm dual discs",
            abs: "Electronically Controlled CBS",
            suspension: "Double wishbone / Pro-Link",
        },
        features: ["Airbag", "Apple CarPlay", "Walking Mode", "Adjustable Windscreen"],
        description: "The pinnacle of long-distance luxury touring.",
        images: ["https://images.unsplash.com/photo-1596485807901-be174f882f07"],
        isHighlighted: true,
    },
    {
        modelName: "Triumph Tiger 900 Rally Pro",
        brandName: "Triumph",
        price: 1550000,
        type: "Adventure",
        displacement: 888,
        specifications: {
            engineType: "888cc, Liquid-cooled, 12-valve, DOHC",
            maxPower: "95 HP @ 8,750 rpm",
            maxTorque: "87 Nm @ 7,250 rpm",
            fuelCapacity: "20 Liters",
            weight: "201 kg",
            topSpeed: "200 km/h",
            seatHeight: "850 mm",
            gearbox: "6-speed",
            frontBrake: "Brembo Stylema monobloc",
            abs: "Optimised Cornering ABS",
            suspension: "Showa 45mm USD fork / Showa RSU",
        },
        features: ["GoPro Control", "Turn-by-turn Navigation", "Heated Seats"],
        description: "A benchmark-setting adventure bike with off-road focus.",
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f"],
        isHighlighted: true,
    },
    {
        modelName: "Harley-Davidson Fat Boy 114",
        brandName: "Harley-Davidson",
        price: 2449000,
        type: "Cruiser",
        displacement: 1868,
        specifications: {
            engineType: "1868cc, Milwaukee-Eight 114",
            maxPower: "94 HP @ 5,020 rpm",
            maxTorque: "155 Nm @ 3,000 rpm",
            fuelCapacity: "18.9 Liters",
            weight: "317 kg",
            topSpeed: "177 km/h",
            seatHeight: "675 mm",
            gearbox: "6-speed",
            frontBrake: "4-piston fixed front",
            rearBrake: "2-piston floating rear",
            abs: "Standard",
            suspension: "High-performance front suspension",
        },
        features: ["Lakester Wheels", "Signature LED Lighting", "Chrome Finishes"],
        description: "The original fat custom icon, powered by the Milwaukee-Eight 114.",
        images: ["https://images.unsplash.com/photo-1558981403-c5f91eb1c084"],
        isHighlighted: true,
    },
    {
        modelName: "BMW R 1250 GS Adventure",
        brandName: "BMW Motorrad",
        price: 2250000,
        type: "Adventure",
        displacement: 1254,
        specifications: {
            engineType: "1254cc, Air/liquid-cooled 4-stroke flat twin",
            maxPower: "136 HP @ 7,750 rpm",
            maxTorque: "143 Nm @ 6,250 rpm",
            fuelCapacity: "30 Liters",
            weight: "268 kg",
            topSpeed: "200+ km/h",
            seatHeight: "890 mm",
            gearbox: "6-speed",
            frontBrake: "Twin disc brake",
            abs: "BMW Motorrad Integral ABS Pro",
            suspension: "BMW Motorrad Telelever / Paralever",
        },
        features: ["ShiftCam Technology", "Electronic Suspension Adjustment (ESA)", "HSC Pro"],
        description: "The world is yours with the ultimate globetrotter.",
        images: ["https://images.unsplash.com/photo-1591637333184-19aa84b3e01f"],
        isHighlighted: true,
    },
    {
        modelName: "Suzuki Katana",
        brandName: "Suzuki",
        price: 1361000,
        type: "Naked",
        displacement: 999,
        specifications: {
            engineType: "999cc, 4-stroke, liquid-cooled",
            maxPower: "150 HP @ 11,000 rpm",
            maxTorque: "106 Nm @ 9,250 rpm",
            fuelCapacity: "12 Liters",
            weight: "215 kg",
            topSpeed: "240 km/h",
            seatHeight: "825 mm",
            gearbox: "6-speed",
            frontBrake: "Twin 310 mm discs",
            abs: "Bosch ABS",
            suspension: "KYB fully adjustable USD fork",
        },
        features: ["Suzuki Intelligent Ride System", "Traction Control", "Low RPM Assist"],
        description: "A modern icon based on the legendary 1981 original.",
        images: ["https://images.unsplash.com/photo-1599819811279-d5ad9cccf815"],
        isLatest: true,
    }
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
