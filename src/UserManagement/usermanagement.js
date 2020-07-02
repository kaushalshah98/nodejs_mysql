let { connection, app, mysql } = require('../connection');

//Api for verifying the user
app.post('/verifyuser', (req, res) => {

    name = req.body.Name;
    pass = req.body.Password;
    let sql = "SELECT * FROM users where username=" + mysql.escape(name) + "&& password=" + mysql.escape(pass);
    connection.query(sql, (err, row, field) => {
        if (err) {
            errr = {
                Errorcode: err.errno,
                ErrorMessage: err.message,
                Status: err.code
            };
            res.send(errr)
            console.log(err)
        } else
            res.send(row);
    });
});

//Api for Updating the user data
app.post('/updateuserdata', (req, res) => {

    userid = req.body.userid;
    username = req.body.username;
    password = req.body.password;
    email = req.body.email;
    phone = req.body.phone;

    let sql = "UPDATE users SET userid=" + mysql.escape(userid) + ",username=" + mysql.escape(username) +
        ",password =" + mysql.escape(password) + ",email =" + mysql.escape(email) + ",phone=" + mysql.escape(phone)
        + " WHERE userid =" + mysql.escape(userid);
    connection.query(sql, (err, row, field) => {
        let sql = "SELECT * FROM users where userid=" + mysql.escape(userid);
        connection.query(sql, (err, row, field) => {
            if (err) {
                errr = {
                    Errorcode: err.errno,
                    ErrorMessage: err.message,
                    Status: err.code
                };
                res.send(errr)
                console.log(err)
            } else
                res.send(row);
        });
    });
});

//Api for Creating the user 
app.post('/createuser', (req, res) => {

    name = req.body.Name;
    pass = req.body.password;
    email = req.body.email;
    phone = req.body.Phone;
    profilepic = req.body.Profilepic;
    values = [
        [name, pass, email, phone, profilepic]
    ];
    let sql = "INSERT INTO users (username, password, email, phone,profilepic) VALUES ? ";
    connection.query(sql, [values], (err, row, field) => {
        if (err) {
            errr = {
                Errorcode: err.errno,
                ErrorMessage: err.message,
                Status: err.code
            };
            res.send(errr)
            console.log(err)
        } else
            res.send(row);
    });
});
