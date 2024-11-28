const mongoose = require('mongoose');

module.exports = async () => {
    try {
        const db = process.env.DB;
        if (!db) {
            throw new Error('Database connection string is not defined');
        }
        console.log('Database connection string:', db);

        await mongoose.connect(db)
        console.log('Connected to database successfully');
    } catch (error) {
        console.log(error);
        console.log('Could not connect to database');
    }
};
