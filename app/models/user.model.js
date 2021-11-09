const sql = require('./db');
const bcrypt = require('bcrypt');
const ApiResponse = require('../classes/responseFormat.class');
const saltRounds = 10;

const User = function (user) {
    this.email = user.email;
    this.password = user.password;
    this.fname = user.fname;
    this.lname = user.lname;
    this.active = user.active;
    this.phone = user.phone;
    this.current_sem_id = user.current_sem_id;
    this.user_type = user.user_type;
    this.registration_number = user.registration_number;
};

User.login = (email, password, result) => {

    sql.query(`USE rollcall;`);
    if (email && password) {
        sql.query('SELECT * FROM users WHERE email = ?', [email], async (err, res, fields) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length > 0) {
                const comparison = await bcrypt.compare(password, res[0].password);
                if (comparison) {
                    const apiResponse = new ApiResponse(
                        'You have successfully logged in',
                        200,
                        res[0]
                    );
                    result(null, apiResponse);

                } else {
                    result(null, new ApiResponse(
                        'Email and password do not match',
                        204
                    ));
                }
            } else {
                result({kind: "not_found"}, null);
            }
        });
    } else {
        result(null, new ApiResponse(
            'Please enter a username ans password',
            400
        ));

    }
};

User.create = async (newStudent, result) => {
    const password = newStudent.password;
    newStudent.password = await bcrypt.hash(password, saltRounds);
    sql.query(`USE rollcall;`);
    sql.query('INSERT INTO users SET ?', newStudent, (err, res) => {
        if (err) {
            console.log('Error', err);
            result(err, null);
            return;
        }

        console.log('Created Student', {id: res.insertId, ...newStudent});
        result(null, {id: res.insertId, ...newStudent})
    });
};

User.getAll = result => {
    sql.query(`USE rollcall;`);
    let select = `SELECT * FROM users`;
    sql.query(select, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.findById = (studentId, result) => {
    sql.query(`USE rollcall;`);
    sql.query(`SELECT * FROM users WHERE id = ${studentId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found student: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({kind: "not_found"}, null);
    });
};

User.updateById = (id, user, result) => {
    sql.query(`USE rollcall;`);
    let select = `SELECT * FROM users WHERE id = ${id}`;
    sql.query(select, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length > 0) {
            let currentVal = res[0];
            sql.query(
                `UPDATE ${sql.escapeId('rollcall.users')} SET email = ?, password = ?, fname = ?, lname = ?, active = ?, phone = ?, current_sem_id = ?, user_type = ?, registration_number = ? WHERE id = ?`,
                [user.email || currentVal.email, user.password || currentVal.password, user.fname || currentVal.fname, user.lname || currentVal.lname, user.active || currentVal.active, user.phone || currentVal.phone, user.current_sem_id || currentVal.current_sem_id, user.user_type || currentVal.user_type, user.registration_number || currentVal.registration_number, id],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    if (res.affectedRows === 0) {
                        result({kind: "not_found"}, null);
                        return;
                    }

                    console.log("Updated user: ", {id: id, ...user});
                    result(null, new ApiResponse(
                        'User Updated successfully',
                        200,
                        user
                    ));
                }
            );
        }
    });
};

User.remove = (id, result) => {
    sql.query(`USE rollcall;`);
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Customer with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted student with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query(`USE rollcall;`);
    sql.query("DELETE FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} users`);
        result(null, res);
    });
};


module.exports = User;
