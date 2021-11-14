const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');


// create express app
const app = express();


const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'secretsecretsessionnkeys',
    cookie: {maxAge: oneDay},
    resave: true,
    saveUninitialized: true
}));

const corsOptions = {
    origin: "http://localhost:5050"
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({extended: true}));
// parse requests of content-type - application/json
// app.use(bodyParser.json());

app.use(cookieParser());


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Roll call application. Take notes quickly. Organize and keep track of all your notes."});
});

require("./app/routes/user.routes")(app);
require("./app/routes/attendance.routes")(app);
require("./app/routes/classes.routes")(app);

// listen for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
