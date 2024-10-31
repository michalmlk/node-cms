const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to database');
    } catch (e) {
        console.error(`Failed to connect to database: ${e}`);
        process.exit(1);
    }
}

module.exports = connectToDatabase;