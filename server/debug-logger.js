const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'debug.log');

const debugLogger = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile(logFile, log, (err) => {
        if (err) console.error("Failed to write to debug log", err);
    });
    next();
};

module.exports = debugLogger;
