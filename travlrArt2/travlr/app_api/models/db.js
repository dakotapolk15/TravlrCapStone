const mongoose = require('mongoose');
const readLine = require('readline');

// Import the Mongoose schemas
require('./user');
require('./travlr');  // Make sure you import your models after the database connection

// Database connection URI
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/travlr';

// Establishing connection with MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Mongoose connected to ${dbURI}`);
    })
    .catch((err) => {
        console.log('Mongoose connection error:', err);
    });

// Graceful shutdown for different termination signals
const gracefulShutdown = (msg) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        process.exit(0);
    });
};

// Event Listeners to handle graceful shutdowns
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart');
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
    gracefulShutdown('app termination');
});

process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown');
});

// Windows-specific listener
if (process.platform === 'win32') {
    const r1 = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r1.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

module.exports = mongoose;
