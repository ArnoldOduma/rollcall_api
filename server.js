const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const session = require('express-session');



// create express app
const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cors(corsOptions));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Roll call application. Take notes quickly. Organize and keep track of all your notes."});
});

require("./app/routes/user.routes")(app);
require("./app/routes/attendance.routes")(app);
require("./app/routes/classes.routes")(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
