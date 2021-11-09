module.exports = app => {
    const classes = require("../controllers/classes.controller");

    app.post("/classes", classes.create);

    // // List all attendance
    app.get("/classes", classes.findAll);
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
};
