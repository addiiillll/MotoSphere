import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Brand name is required"],
            unique: true,
            trim: true,
        },
        logo: {
            type: String,
            default: "https://via.placeholder.com/150",
        },
        description: {
            type: String,
            trim: true,
        },
        originCountry: {
            type: String,
            trim: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
