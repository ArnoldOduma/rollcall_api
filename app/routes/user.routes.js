const cors = require('cors');
const auth = require("../middleware/auth");

module.exports = app => {
    const users = require("../controllers/user.controller.js");

    // Create a new Customer
    app.post("/rollcall/api/user", users.create);

    // List all students
    app.get("/rollcall/api/users", users.findAll);

    // Retrieve a single Customer with customerId
    app.get("/rollcall/api/user/me", auth, users.findOne);

    //Update
    app.put("/rollcall/api/user/:studentId", users.update);

    // Delete a Customer with customerId
    app.delete("/rollcall/api/user/:studentId", users.delete);

    // delete
    app.delete("/rollcall/api/users", users.deleteAll);

    // AUTHENTICATION
    app.post("/rollcall/api/login", cors(), users.login);
};
