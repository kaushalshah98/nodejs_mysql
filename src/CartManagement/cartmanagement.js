let { connection, app, mysql } = require('../connection');

//Api to get the cart items of particular user
app.get('/getcartitems/:userid', (req, res) => {
    userid = req.params.userid;
    let sql = 'SELECT p.productimg,p.productname,p.productprice,c.quantity,p.productid,u.userid,p.productqty' +
        ' FROM shellcart.cart c, shellcart.product p, shellcart.users u' +
        ' where c.userid=u.userid and p.productid=c.productid and c.userid=' + mysql.escape(userid) +

        ';SELECT sum(p.productprice*c.quantity) AS TotalPrice' +
        ' FROM shellcart.cart c, shellcart.product p, shellcart.users u' +
        ' where c.userid=u.userid and p.productid=c.productid and c.userid=' + mysql.escape(userid);

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
//Api to get the cart size of particular user
app.get('/cartsize/:userid', (req, res) => {
    userid = req.params.userid;
    console.log(userid);
    let sql = "SELECT count(*) as CARTSIZE FROM cart where userid = " + mysql.escape(userid);
    connection.query(sql, (err, row, field) => {
        if (err) {
            errr = {
                Errorcode: err.errno,
                ErrorMessage: err.message,
                Status: err.code
            };
            res.send(errr)
            console.log(errr)
        } else
            res.send(row);
    });
});
//Api to add product to cart
app.post('/AddTocart', (req, res) => {
    let ret;
    productid = req.body.productid;
    userid = req.body.userid;
    quantity = 0;

    let values = [
        [userid, productid, quantity]
    ];
    let sql = 'SELECT c.quantity FROM shellcart.cart c, shellcart.users u, shellcart.product p' +
        ' where c.userid=u.userid and p.productid= c .productid' +
        ' and c.userid=' + mysql.escape(userid) + ' and p.productid=' + mysql.escape(productid);

    connection.query(sql, (h, row, field) => {
        if (row === null || row.length <= 0 || row === undefined) {
            values[0][2] = 1;
            let sql = "INSERT INTO cart (userid,productid,quantity) VALUES ? ";

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
        }
        else {
            ret = JSON.stringify(row[0].quantity);
            ret++;
            let sql = 'SET SQL_SAFE_UPDATES =0;' +
                ' UPDATE shellcart.cart c, shellcart.users u, shellcart.product p' +
                ' SET c.quantity =' + mysql.escape(ret) +
                ' where c.userid=u.userid and p.productid= c .productid' +
                ' and c.userid=' + mysql.escape(userid) + ' and p.productid=' + mysql.escape(productid) +
                ' ;SET SQL_SAFE_UPDATES =0;'

            connection.query(sql, (err, row, field) => {
                if (err)
                    console.log("Error Obtaining a result...")
                else
                    res.send(row);
            });
        }
    });
});
//Api to empty cart of particular user
app.delete('/emptycart/:userid', (req, res) => {

    let userid = req.params.userid;
    let sql = "DELETE FROM cart WHERE userid=" + mysql.escape(userid);
    connection.query(sql, (err, row, field) => {
        if (err) {
            errr = {
                Errorcode: err.errno,
                ErrorMessage: err.message,
                Status: err.code
            };
            res.send(errr)
            console.log(errr)
        } else
            res.send(row);
    });
});
//Api to remove cartitem
app.post('/removecartitem', (req, res) => {

    let productid = req.body.productid;
    let userid = req.body.userid;

    let sql = "DELETE FROM cart WHERE productid=" + mysql.escape(productid) + " AND userid=" + mysql.escape(userid);

    connection.query(sql, (err, row, field) => {
        if (err) {
            errr = {
                Errorcode: err.errno,
                ErrorMessage: err.message,
                Status: err.code
            };
            res.send(errr)
            console.log(err)
        }
        else
            res.send(row);
    });
});
//Api to update cartitem
app.put('/updatecartitem', (req, res) => {
    let qty = req.body.quantity;
    let productid = req.body.productid;
    let userid = req.body.userid;

    let sql = 'SET SQL_SAFE_UPDATES =0;' +
        ' UPDATE shellcart.cart c, shellcart.users u, shellcart.product p' +
        ' SET c.quantity =' + mysql.escape(qty) +
        ' where c.userid=u.userid and p.productid= c .productid' +
        ' and c.userid=' + mysql.escape(userid) + ' and p.productid=' + mysql.escape(productid) +
        ' ;SET SQL_SAFE_UPDATES =0;';

    connection.query(sql, (err, row, field) => {
        if (err) {
            errr = {
                Errorcode: err.errno,
                ErrorMessage: err.message,
                Status: err.code
            };
            res.send(errr)
            console.log(err)
        }
        else
            res.send(row);
    });
});

