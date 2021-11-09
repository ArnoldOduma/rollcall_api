const Classes = require("../models/classes.model");


// Create and Save a new Attendance
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const attendance = new Classes({
        user_id: req.body.user_id,
        time_in: req.body.time_in,
        time_out: req.body.time_out,
        semester_id: req.body.semester_id,
        class_id: req.body.class_id,
        // this.title = classes.title;
    // this.start_time = classes.start_time;
    // this.class_code = classes.class_code;
    // this.end_time = classes.end_time;
    // this.semester_id = classes.semester_id;
    // this.venue = classes.venue;
    // this.lecturer_id = classes.lecturer_id;
    // this.lecture_day = classes.lecture_day;
    });

    Classes.create(attendance, (err, data) => {
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
    Classes.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving attendance."
            });
        else res.send(data);
    });
};
