const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then((res) => {
            console.log('MongoDB connected successfully');
        }).catch((err) => {
            console.log('Error connecting to MongoDB:', err);
        });
    } catch (error) {
        // Handle any unexpected errors (though in this example, it's an empty block)
    }
};

module.exports = connectDB;
