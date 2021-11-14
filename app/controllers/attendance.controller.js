const Attendance = require("../models/attendance.model");
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
require("dotenv").config();

// Create and Save a new Attendance
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const user = jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_KEY);
    const attendance = new Attendance({
        user_id: user.user_id,
        time_in: req.body.time_in,
        time_out: req.body.time_out,
        date: req.body.date,
        semester_id: req.body.semester_id,
        class_id: req.body.class_id,
    });

    Attendance.create(attendance, (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(400).send({
                message:
                    err.message || "Some error occurred while creating the attendance."
            });
            res.sendStatus(500).send({
                message:
                    err.message || "Some error occurred while creating the attendance."
            });
        } else res.send(data);
    });
};

// Get all attendance
exports.findAll = (req, res) => {
    Attendance.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving attendance."
            });
        else res.send(data);
    });
};
