const User = require("../models/user.model");

// Create and Save a new Customer
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    User.login(req.body.email, req.body.password, (err, data) => {
        console.log(err, data);
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User with email ${req.body.email} was not found.`,
                    code: 404
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student with email " + req.params.email,
                    code: 500
                });
            }
        } else
            res.send(data);
    });
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
        current_sem: req.body.current_sem,
        user_type: req.body.user_type,
        registration_number: req.body.registration_number
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
    User.findById(req.params.studentId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.params.studentId}.`
                });
            } else {
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

    User.updateById(
        req.params.studentId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Student with id ${req.params.studentId}. not found.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.studentId
                    });
                }
            } else res.send(data);
        }
    );
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
