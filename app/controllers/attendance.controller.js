const Attendance = require("../models/attendance.model");
const jwt = require('jsonwebtoken');
require("dotenv").config();

let dateObj = new Date();
const month = dateObj.getUTCMonth() + 1;
const day = dateObj.getUTCDate();
const year = dateObj.getUTCFullYear();
dateToday = year + "-" + month + "-" + day;

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
        date: dateToday,
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

// Find a single Customer with a customerId
exports.findByUser = (req, res) => {
    Attendance.findByUserId(req.user.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                if (res.statusCode === 404) {
                }
                res.status(500).send({
                    message: "Error retrieving Student with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findByUserToday = (req, res) => {
    Attendance.findByUserIdToday(req.user.user_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found attendance.`
                });
            } else {
                if (res.statusCode === 404) {
                }
                res.status(500).send({
                    message: "Error retrieving Attendance"
                });
            }
        } else res.send(data);
    });
};
