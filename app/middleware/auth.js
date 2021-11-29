const jwt = require("jsonwebtoken");
const ApiResponse = require('../classes/responseFormat.class');
const config = process.env;

const verifyToken = (req, res, next) => {
    const incomingToken =
        req.body.token || req.query.token || req.headers["authorization"];

    const token = incomingToken ? incomingToken.split(' ')[1] : null;

    let response;
    if (!token) {
        console.log('token', token)
        response = new ApiResponse(
            "A token is required for authentication",
            403
        );
        return res.status(403).send(response);
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_KEY);
        console.log(req.user);
    } catch (err) {
        response = new ApiResponse(
            "Invalid Token",
            401
        );
        return res.status(401).send(response);
    }
    return next();
};

module.exports = verifyToken;
