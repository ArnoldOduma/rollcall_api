const jwt = require("jsonwebtoken");
require("dotenv").config();

const config = process.env;

const verifyToken = (req, res, next) => {
    const incomingToken =
        req.body.token || req.query.token || req.headers["authorization"];

    const token = incomingToken ? incomingToken.split(' ')[1] : null;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;
