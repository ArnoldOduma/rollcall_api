const auth = require("../middleware/auth");

module.exports = app => {
    const classes = require("../controllers/classes.controller");
    app.use(auth);
    app.post("/rollcall/api/classes", classes.create);


    // List all attendance
    app.get("/rollcall/api/classes", classes.findAll);


    //USER CLASSES
    app.post("/rollcall/api/user-classes", classes.createUserClasses);
    // get user classes
    app.get("/rollcall/api/user-classes", classes.findUserClasses);
    // Get logged in user classes
    app.get("/rollcall/api/user-classes/me", classes.findCurrentUserClassesByID);
    //get user classes by id
    app.get("/rollcall/api/user-classes/:id", classes.findUserClassesByID);
    //Delete user class
    app.delete("/rollcall/api/user-classes/:id", classes.deleteUserClassesByID);


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
