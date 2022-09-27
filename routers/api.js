const Products = require("../controllers/products");
const Orders = require("../controllers/orders.js");
const Users = require("../controllers/users.js");

const router = require("express").Router();

router.get("/products", Products.getAll);
router.get("/products/:id", Products.get);
router.post("/products", Products.create);
router.put("/products/:id", Products.update);
router.delete("/products/:id", Products.remove);

router.get("/orders", Orders.getAll);
router.get("/orders/:id", Orders.get);
router.post("/orders", Orders.create);
router.put("/orders/:id", Orders.update);
router.delete("/orders/:id", Orders.remove);

router.get("/users", Users.getAll);
router.get("/users/:username", Users.get);
router.post("/users", Users.create);
router.put("/users/:username/role", Users.updateRole);
router.put("/users/:username", Users.updateInfo);
router.delete("/users/:id", Users.remove);

module.exports = router;
