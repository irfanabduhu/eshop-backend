const Products = require("../models/Product");
const Orders = require("../models/Order");
const Users = require("../models/User");

const router = require("express").Router();

router.get("/products/:id", Products.get);
router.get("/products", Products.getAll);
router.post("/products", Products.create);
router.put("/products/:id", Products.update);
router.delete("/products/:id", Products.remove);

router.get("/orders/:id", Orders.get);
router.get("/orders", Orders.getAll);
router.post("/orders", Orders.create);
router.put("/orders/:id", Orders.update);
router.delete("/orders/:id", Orders.remove);

router.get("/users/:username", Users.get);
router.get("/users", Users.getAll);
router.post("/users", Users.create);
router.put("/users/:id/role", Users.updateRole);
router.put("/users/:id", Users.updateInfo);
router.delete("/users/:id", Users.remove);

module.exports = router;
