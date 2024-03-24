const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        reuired: [true, "Name must be provided"],
    },
    price: {
        type: Number,
        reuired: [true, "Price must be provided"],
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.9
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    brand: {
        type: String,
        enum: {
            values: ["apple", "samsung", "hp", "lg", "dell", "lenovo"],
            message: `{VALUE} is not alowed`
        }
    },
});

const product = new mongoose.model("Product", productSchema);
module.exports = product;