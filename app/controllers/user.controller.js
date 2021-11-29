const User = require("../models/user.model");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const ApiResponse = require('../classes/responseFormat.class');
require("dotenv").config();

const config = process.env;
let session;

// Create and Save a new Customer
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.login(req.body.email, req.body.password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send(new ApiResponse(
                    `User with email ${req.body.email} was not found. If this is your first time here, register before logging in.`,
                    404
                ))
            } else {
                res.status(500).send(new ApiResponse(
                    "Error retrieving user with email " + req.params.email,
                    500
                ));
            }
        } else {
            session = req.session;
            session.userCode = data.data ? data.data.id : null;
            session.userid = req.body.email;
            // Create token
            if (data.data) {
                data.token = jwt.sign(
                    {
                        user_id: data.data.id,
                        user_name: data.data.fname + ' ' + data.data.lname,
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "24h",
                    }
                );
            }
            res.send(data);
        }
    }).then();
};

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const user = new User({
        email: req.body.email,
        fname: req.body.fname,
        lname: req.body.lname,
        active: req.body.active,
        password: req.body.password,
        phone: req.body.phone,
        user_type: req.body.user_type,
        registration_number: req.body.registration_number,
        current_sem_id: req.body.current_sem_id
    });

    // Save Customer in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    User.findById(req.user.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.studentId}.`
                });
            } else {
                if (res.statusCode === 404) {
                }
                res.status(500).send({
                    message: "Error retrieving Student with id " + req.params.studentId
                });
            }
        } else res.send(data);
    });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const incomingToken = req.headers["authorization"];
    const token = incomingToken ? incomingToken.split(' ')[1] : null;

    jwt.verify(token, config.TOKEN_KEY, function (err, decoded) {
        User.updateById(
            decoded.user_id,
            new User(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Student with id ${req.params.studentId}. not found.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating user with id " + req.params.studentId
                        });
                    }
                } else res.send(data);
            }
        );
    });


};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    User.remove(req.params.studentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Student with id ${req.params.studentId} not found.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Student with id " + req.params.studentId
                });
            }
        } else res.send({message: `Student was deleted successfully!`});
    });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};
