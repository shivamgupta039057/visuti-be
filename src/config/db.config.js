const devConfig = require('./dev.config');
const mongoose = require('mongoose');

const dbUrl = devConfig.DB_URL;

if (typeof dbUrl !== 'string' || !dbUrl) {
    console.error('Database connection failed: process.env.DB_URL is not set or is not a string.');
    process.exit(1);
}

mongoose.connect(dbUrl)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
        process.exit(1);
    });
