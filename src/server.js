let { connection, app } = require('./connection');

//Importing the files
require('./CartManagement/cartmanagement.js');
require('./UserManagement/usermanagement.js')
require('./ProductManagement/productmanagement.js')

//Connecting To a Database
connection.connect(err => {
    if (!err) {
        console.log("Database is connected..")
    }
    else
        console.log("Error Connecting a Database...");
});

//Server created on port :-  3000
app.listen(3000, () => console.log("Server is Running....."));