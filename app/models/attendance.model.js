const sql = require('./db');
const bcrypt = require('bcrypt');
const ApiResponse = require('../classes/responseFormat.class');

function getDate() {
    let dateObj = new Date();
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    const day = ("0" + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    return year + "-" + month + "-" + day;
}

const Attendance = function (attendance) {
    this.user_id = attendance.user_id;
    this.time_in = attendance.time_in;
    this.time_out = attendance.time_out;
    this.date = getDate();
    this.semester_id = attendance.semester_id;
    this.class_id = attendance.class_id;
};

Attendance.create = async (newAttendance, result) => {
    console.log("date----------------------------------", getDate());
    let select = `
        SELECT * FROM attendance
        WHERE CAST(date AS DATE) LIKE ? AND class_id = ? AND user_id = ?`;
    sql.query(select, [getDate(), newAttendance.class_id, newAttendance.user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return [];
        } else {
            console.log(res);
            if (res.length < 1) {
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
            } else {
                console.log(result);
                result(err, new ApiResponse(
                    'Attendance already marked for today',
                    400
                ));
            }
        }
    });
};


Attendance.getAll = result => {
    sql.query(`USE rollcall;`);
    let select = `SELECT * FROM attendance a
    JOIN users u ON u.id = a.user_id
    JOIN semester s ON s.id = a.semester_id
    JOIN classes c ON c.id = a.class_id
    `;
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

Attendance.findByUserId = async (id, result) => {
    sql.query(`
        SELECT * FROM attendance a 
        JOIN users u ON u.id = a.user_id
        JOIN semester s ON s.id = a.semester_id
        JOIN classes c ON c.id = a.class_id
        WHERE user_id = ?
        ORDER BY date DESC`, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found attendance: ", res);
            const apiRes = new ApiResponse(
                'Attendance fetched successfully',
                200,
                res
            );
            result(null, apiRes);
            return res;
        }

        // not found Customer with the id
        result({kind: "not_found"}, null);
    });
};

Attendance.findByUserIdToday = async (id, result) => {
    const date = await getDate();
    sql.query(`
    SELECT *  FROM attendance WHERE user_id = ? AND CAST(date AS DATE) LIKE ?
    ORDER BY date DESC`, [id, date], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            const apiRes = new ApiResponse(
                'Attendance fetched successfully',
                200,
                res
            );
            result(null, apiRes);
            return res;
        }

        // not found Customer with the id
        result({kind: "not_found"}, null);
    });
};


module.exports = Attendance;
