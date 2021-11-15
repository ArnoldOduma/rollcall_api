const mysql = require('mysql');
const dbConfig = require('../config/database.config.js');

// Create connection to the database
const connection = mysql.createPool(
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB,
    }
);

// Open new mysql connection
connection.getConnection((error, conn) => {
    if (error) throw error;
    console.log('Successfully connected to database.', error);
    conn.release();
});

module.exports = connection;
