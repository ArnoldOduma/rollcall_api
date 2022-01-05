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


Classes.createUserClasses = async (newClass, result) => {
    let select = `
        SELECT * FROM user_classes
        WHERE class_id = ? AND user_id = ?`;

    await sql.query(select, [newClass.class_id, newClass.user_id], (err, res, next) => {
        try {
            if (err) {
                result(null, err);
                return [];
            } else {
                if (res.length < 1) {
                    sql.query('INSERT INTO user_classes SET ?', newClass, (err, res) => {
                        if (err) {
                            console.log('Error', err);
                            result(err, null);
                        } else {
                            result(null, new ApiResponse(
                                'user class added successfully',
                                200,
                                newClass
                            ));
                        }
                    });
                } else {
                    console.log(result);
                    result(err, new ApiResponse(
                        'Class already already added for user',
                        400
                    ));
                }
            }
        } catch (e) {
            next(e);
        }
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

Classes.getUserClasses = result => {

    let select = `
    SELECT uc.id, u.fname As user_fname, u.lname As user_lname, u.id As user_id, c.id As class_id, c.title As class_title
    FROM user_classes uc
    JOIN users u ON u.id = uc.user_id
    JOIN classes c ON c.id = uc.class_id
    `;

    sql.query(select, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, new ApiResponse(
            'Fetched user classes successfully',
            200,
            res
        ));
    });
};


Classes.getUserClassesByUserId = async (id, result) => {
    sql.query(`
        SELECT uc.id, u.fname As user_fname, u.lname As user_lname, u.id As user_id, c.id As class_id, c.title As class_title, c.class_code As class_code
        FROM user_classes uc
        JOIN users u ON u.id = uc.user_id
        JOIN classes c ON c.id = uc.class_id
        WHERE user_id = ?
        `, [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found attendance: ", res);
            const apiRes = new ApiResponse(
                'User classes fetched successfully',
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

module.exports = Classes;
