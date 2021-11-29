const sql = require('./db');
const ApiResponse = require('../classes/responseFormat.class');

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

Classes.create = async (newClass, result) => {
    sql.query('INSERT INTO classes SET ?', newClass, (err, res) => {
        if (err) {
            console.log('Error', err);
            result(err, null);
            return;
        }

        result(null, new ApiResponse(
            'Class added successfully',
            200,
            newClass
        ));
    });
};

Classes.getAll = result => {

    let select = `
    SELECT c.id, c.title, c.class_code, c.start_time, c.end_time, c.venue, c.lecture_day, c.meeting_link, c.google_classroom_code, u.fname As lecturer_fname, u.lname As lecturer_lname, u.id As lecturer_id, s.id As sem_id, s.number As sem_number, s.name As sem_name
    FROM classes c
    JOIN users u ON u.id = c.lecturer_id
    JOIN semester s ON s.id = c.semester_id
    `;

    sql.query(select, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, new ApiResponse(
            'Fetched classes successfully',
            200,
            res
        ));
    });
};

module.exports = Classes;
