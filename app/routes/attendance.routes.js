const auth = require("../middleware/auth");
const express = require('express');
const router = express.Router();

module.exports = app => {
    const attendance = require("../controllers/attendance.controller");
    app.use(auth);
    app.post("/attendance", attendance.create);
    // // List all attendance
    app.get("/attendance", attendance.findAll);
    //
    // // Retrieve a single Customer with customerId
    // app.get("/students/:studentId", users.findOne);
    //
    // //Update
    // app.put("/students/:studentId", users.update);
    //
    // // Delete a Customer with customerId
    // app.delete("/students/:studentId", users.delete);
    //
    // // delete
    // app.delete("/students", users.deleteAll);
    //
    //
    //
    // // AUTHENTICATION
    // app.post("/login", users.login);

    app.use('/', router)
};
