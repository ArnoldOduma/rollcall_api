const sql = require('./db');
const bcrypt = require('bcrypt');
const ApiResponse = require('../classes/responseFormat.class');
const saltRounds = 10;

const Attendance = function (attendance) {
    this.user_id = attendance.user_id;
    this.time_in = attendance.time_in;
    this.time_out = attendance.time_out;
    this.semester_id = attendance.semester_id;
    this.class_id = attendance.class_id;
};

Attendance.create = async (newAttendance, result) => {
    sql.query(`USE rollcall;`);
    sql.query('INSERT INTO attendance SET ?', newAttendance, (err, res) => {
        if (err) {
            console.log('Error', err);
            result(err, null);
            return;
        }

        result(null, new ApiResponse(
            'Attendance added successfully',
            200,
            newAttendance
        ));
    });
};


Attendance.getAll = result => {
    sql.query(`USE rollcall;`);
    let select = `SELECT * FROM attendance`;
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


module.exports = Attendance;
