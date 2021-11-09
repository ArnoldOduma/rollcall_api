const mysql = require('mysql');
const dbConfig = require('../config/database.config.js');

// Create connection to the database
const connection = mysql.createConnection(
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DATABASE,
    }
);

// Open new mysql connection
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to database', error);
});

module.exports = connection;
