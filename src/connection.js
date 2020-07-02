let mysql = require('mysql');
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

//creating a connection with a database
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '0168',
    database: 'shellcart',
    multipleStatements: true
});

//Exporting the necessary variables
exports.connection = connection;
exports.app = app;
exports.mysql = mysql;