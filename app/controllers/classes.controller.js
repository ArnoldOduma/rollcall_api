const Classes = require("../models/classes.model");
const jwt = require('jsonwebtoken');

// Create and Save a new Attendance
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const attendance = new Classes({
        // user_id: req.body.user_id,
        // time_in: req.body.time_in,
        // time_out: req.body.time_out,
        // semester_id: req.body.semester_id,
        // class_id: req.body.class_id,
    });

    Classes.create(attendance, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the attendance."
            });
        else res.send(data);
    }).then();
};


// Create and Save user classes
exports.createUserClasses = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const user = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_KEY);
    const classes = {
        user_id: user.user_id,
        class_id: req.body.class_id,
        active: req.body.active ? req.body.active : 1
    };

    Classes.createUserClasses(classes, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `Class with id was not found.`
                });
            } else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the user classes."
                });
            }
        } else {
            res.send(data);
        }
    }).then();
};

// Get all attendance
exports.findAll = (req, res) => {
    Classes.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving attendance."
            });
        else res.send(data);
    });
};

// Get user classes
exports.findUserClasses = (req, res) => {
    Classes.getUserClasses((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving user classes."
            });
        else res.send(data);
    });
};

// Find a single user classes
exports.findUserClassesByID = (req, res) => {
    Classes.getUserClassesByUserId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found classes for user with id ${req.params.id}.`
                });
            } else {
                if (res.statusCode === 404) {
                }
                res.status(500).send({
                    message: "Error retrieving classes for user with id " + req.params.id
                });
            }
        } else res.send(data);
    }).then();
};

exports.findCurrentUserClassesByID = (req, res) => {
    const user = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_KEY);
    Classes.getUserClassesByUserId(user.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found classes for user with id ${user.user_id}.`
                });
            } else {
                if (res.statusCode === 404) {
                }
                res.status(500).send({
                    message: "Error retrieving classes for user with id " + user.user_id
                });
            }
        } else res.send(data);
    }).then();
};

// Find a single user classes
exports.deleteUserClassesByID = (req, res) => {
    Classes.deleteUserClass(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user class with id ${req.params.id}.`
                });
            } else {
                if (res.statusCode === 404) {
                }
                res.status(500).send({
                    message: "Error retrieving user class with id " + req.params.id
                });
            }
        } else res.send(data);
    }).then();
};
