require("dotenv").config();

module.exports = {
    HOST: process.env.HOST,
    PORT: 3306,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DB: process.env.DB
};
// module.exports = {
//     HOST: "http://sql102.epizy.com",
//     PORT: 3306,
//     USER: "epiz_30364228",
//     PASSWORD: "tPNMmLlCPWZWOr",
//     DB: "epiz_30364228_rollcall"
// };
