const http = require("http")
const express = require("express")
const path = require("path")

const app = express()
const hbs = require("hbs")

// routes to porduct.js
const productRoute = require("./routes/product")

const dbConnection = require("./connection/db")
// console.log(dbConnection);

// app.use(express.static("express"))
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }))

// set view location app
app.set("views", path.join(__dirname, "views"))

// set tamplate engine
app.set("view engine", "hbs")

// register view partials
hbs.registerPartials(path.join(__dirname, "views/partials"))

// render index.page
app.get("/", function(req, res) {
    const query = "SELECT * FROM tb_product ORDER BY created_at DESC";

    dbConnection.getConnection((err, conn) => {
        if (err)
            throw err;
        
        // console.log(dbConnection)
        conn.query(query, (err, results) => {
            if (err)
                throw err;
            
            let products = [];

            for (let result of results) {
                products.push(result);
            }
            
            res.render("index", {title: "Ecommerce", isLogin: true, products})
        })
        conn.release;
    })

})

app.get("/product/:id", function (req, res) {
    const { id } = req.params;

    res.render("product/product", {title: "Ecommerce", isLogin: true, id})
})

app.use("/", productRoute);

const server = http.createServer(app)
const port = 5000
server.listen(port, () => {
    console.log("Server running on port ", port)
})