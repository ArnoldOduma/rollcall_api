module.exports = app => {
    const users = require("../controllers/user.controller.js");

    // Create a new Customer
    app.post("/user", users.create);

    // List all students
    app.get("/users", users.findAll);

    // Retrieve a single Customer with customerId
    app.get("/user/:studentId", users.findOne);

    //Update
    app.put("/user/:studentId", users.update);

    // Delete a Customer with customerId
    app.delete("/user/:studentId", users.delete);

    // delete
    app.delete("/users", users.deleteAll);



    // AUTHENTICATION
    app.post("/login", users.login);
}
