import mongoose from "mongoose";

const motorcycleSchema = new mongoose.Schema(
    {
        modelName: {
            type: String,
            required: [true, "Model name is required"],
            trim: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: [true, "Brand is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
        },
        type: {
            type: String,
            enum: ["Sport", "Cruiser", "Adventure", "Touring", "Naked", "Off-road", "Scooter"],
            required: [true, "Motorcycle type is required"],
        },
        displacement: {
            type: Number, // in cc
            required: [true, "Displacement is required"],
        },
        specifications: {
            engineType: String,
            maxPower: String,
            maxTorque: String,
            fuelCapacity: String,
            weight: String,
            topSpeed: String,
            seatHeight: String,
            gearbox: String,
            frontBrake: String,
            rearBrake: String,
            abs: String,
            suspension: String,
        },
        features: [String],
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        images: [
            {
                type: String,
                required: true,
            },
        ],
        isLatest: {
            type: Boolean,
            default: false,
        },
        isHighlighted: {
            type: Boolean,
            default: false,
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true }
);

// Pre-save hook to generate slug can be added if needed, or handled in controller
const Motorcycle = mongoose.model("Motorcycle", motorcycleSchema);
export default Motorcycle;
