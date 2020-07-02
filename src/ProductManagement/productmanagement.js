let { connection, app, mysql } = require('../connection');

//Api to Fetch all product details
app.get('/getallproducts', (req, res) => {

    let sql = 'SELECT * FROM product ORDER BY productid DESC';
    connection.query(sql, (err, row, field) => {
        if (err) {
            errr = {
                Errorcode: err.errno,
                ErrorMessage: err.message,
                Status: err.code
            };
            res.send(errr)
            console.log(err)
        } else {
            res.send(row);
        }
    });
});
//Api to add a Product
app.post('/addproduct', (req, res) => {
    name = req.body.name;
    qty = req.body.qty;
    price = req.body.price;
    image = req.body.image;
    values = [
        [name, price, qty, image]
    ];
    let sql = "INSERT INTO product (productname, productprice, productqty, productimg) VALUES ? ";
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
// Api to remove a product
app.delete('/removeproduct/:productid', (req, res) => {

    let productid = req.params.productid;
    let sql = "DELETE FROM product WHERE productid=" + mysql.escape(productid);
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

