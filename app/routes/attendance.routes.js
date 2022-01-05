const auth = require("../middleware/auth");
const express = require('express');
const router = express.Router();

module.exports = app => {
    const attendance = require("../controllers/attendance.controller");
    app.use(auth);
    app.post("/rollcall/api/attendance", attendance.create);
    // // List all attendance
    app.get("/rollcall/api/attendance", attendance.findAll);
    //
    // Retrieve attendance by user
    app.get("/rollcall/api/attendance/me", attendance.findByUser);

    // Retrieve attendance by user
    app.get("/rollcall/api/attendance/me/today", attendance.findByUserToday);

    app.get("/rollcall/api/attendance/me/class/:id", attendance.findByUserPerClass);

    app.get("/rollcall/api/attendance/class/:id", attendance.findByClass);

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
