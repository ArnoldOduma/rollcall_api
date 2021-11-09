const sql = require('./db');
const bcrypt = require('bcrypt');
const ApiResponse = require('../classes/responseFormat.class');
const saltRounds = 10;

const Classes = function (classes) {
    this.title = classes.title;
    this.class_code = classes.class_code;
    this.start_time = classes.start_time;
    this.end_time = classes.end_time;
    this.semester_id = classes.semester_id;
    this.venue = classes.venue;
    this.lecturer_id = classes.lecturer_id;
    this.lecture_day = classes.lecture_day;
};

Classes.create = async (newAttendance, result) => {
    sql.query(`USE rollcall;`);
    sql.query('INSERT INTO classes SET ?', newAttendance, (err, res) => {
        if (err) {
            console.log('Error', err);
            result(err, null);
            return;
        }

        result(null, new ApiResponse(
            'Class added successfully',
            200,
            newAttendance
        ));
    });
};


Classes.getAll = result => {
    sql.query(`USE rollcall;`);
    let select = `SELECT * FROM classes`;
    sql.query(select, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, new ApiResponse(
            'Fetched successfully',
            200,
            res
        ));
    });
};


module.exports = Classes;
