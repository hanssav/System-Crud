const router = require("express").Router();

router.get("/add", function (req, res) {
    res.render("product/addProduct", {
        title: "Add Product",
        isLogin: true,
    })
})

router.get("/edit/:id", function (req, res) {
    res.render("product/editProduct", {
        title: "Update Product",
        isLogin: true,
    })
})


module.exports = router;