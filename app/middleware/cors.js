const jwt = require("jsonwebtoken");
require("dotenv").config();

const config = process.env;

const verifyCors = (req, res, next) => {
    // const incomingToken =
    //     req.body.token || req.query.token || req.headers["authorization"];

    req.headers("Access-Control-Allow-Origin", "*");
    req.headers("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // const token = incomingToken ? incomingToken.split(' ')[1] : null;

    // if (!token) {
    //     return res.status(403).send("A token is required for authentication");
    // }
    // try {
    //     req.user = jwt.verify(token, config.TOKEN_KEY);
    // } catch (err) {
    //     return res.status(401).send("Invalid Token");
    // }

    return next();
};

module.exports = verifyCors;
