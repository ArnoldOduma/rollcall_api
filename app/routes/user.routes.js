module.exports = app => {
    const users = require("../controllers/user.controller.js");

    // Create a new Customer
    app.post("/students", users.create);

    // List all students
    app.get("/students", users.findAll);

    // Retrieve a single Customer with customerId
    app.get("/students/:studentId", users.findOne);

    //Update
    app.put("/students/:studentId", users.update);

    // Delete a Customer with customerId
    app.delete("/students/:studentId", users.delete);

    // delete
    app.delete("/students", users.deleteAll);



    // AUTHENTICATION
    app.post("/login", users.login);
}
