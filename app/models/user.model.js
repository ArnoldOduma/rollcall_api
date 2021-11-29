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

User.login = async (email, password, result) => {

    // Validate if user exist in our database
    await User.findByEmail(email, async (err, res) => {
        if (res) {
            if (await bcrypt.compare(password, res.password)) {
                const apiResponse = new ApiResponse(
                    'You have successfully logged in',
                    200,
                    res
                );
                result(null, apiResponse);
            } else {
                result(err, new ApiResponse(
                    'Email and password do not match!!',
                    204
                ));
                // return res.status(204).send(new ApiResponse(
                //     'Email and password do not match!!',
                //     204
                // ));
                // result(err, null);
            }
        } else {
            console.log("error: ", err);
            result(err, null);
        }
    });
};

User.create = async (newStudent, result) => {

    await User.findByEmail(newStudent.email, async (err, res) => {
        if (res) {
            console.log(res);
            const apiResponse = new ApiResponse(
                `User with email ${res.email} already exists. If this is you, kindly login with ${res.email} as your email and your password in the login screen`,
                400,
                res
            );
            result(null, apiResponse);

        } else {
            const password = newStudent.password;
            if (password) {
                newStudent.password = await bcrypt.hash(password, saltRounds);
            }
            sql.query('INSERT INTO users SET ?', newStudent, (err, res) => {
                if (err) {
                    console.log('Error', err);
                    result(err, null);
                    return;
                }
                const apiResponse = new ApiResponse(
                    `You have been registered successfully. Login to proceed`,
                    200,
                    {id: res.insertId, ...newStudent}
                );
                result(null, apiResponse)
            });
        }
    });


};

User.getAll = result => {
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

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return res[0];
        }

        // not found Customer with the id
        result({kind: "not_found"}, null);
    });
};

User.findByEmail = (email, result) => {
    let qry = `
    SELECT u.id, u.email, u.password, u.fname, u.lname, u.phone, u.active, u.registration_number, u.user_type, u.current_sem_id, u.timestamp, s.name AS semester
    FROM users u
    INNER JOIN semester s
    ON (s.id = u.current_sem_id or u.current_sem_id is NULL)
    WHERE email = ?`;
    sql.query(qry, [email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return res[0];
        }
        console.log(err);
        // not found Customer with the id
        result({kind: "not_found"}, null);
    });

};

User.updateById = (id, user, result) => {
    User.findById(id, (err, res) => {
        if (res) {
            let currentVal = res;
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

                    result(null, new ApiResponse(
                        'User Updated successfully',
                        200,
                        user
                    ));
                }
            );
        } else {
            console.log("error: ", err);
            result(null, err);
        }
    });

};

User.remove = (id, result) => {
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

        result(null, res);
    });
};

User.removeAll = result => {
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
