const Attendance = require("../models/attendance.model");


// Create and Save a new Attendance
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const attendance = new Attendance({
        user_id: req.body.user_id,
        time_in: req.body.time_in,
        time_out: req.body.time_out,
        semester_id: req.body.semester_id,
        class_id: req.body.class_id,
    });

    Attendance.create(attendance, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the attendance."
            });
        else res.send(data);
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
