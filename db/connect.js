const mongoose = require("mongoose");

const connectDB = (uri) => {
    console.log("DB connected!");
    return mongoose.connect(uri)
}

module.exports = connectDB;
