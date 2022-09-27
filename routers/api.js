const auth = require("../auth/index");
const router = require("express").Router();
const productRouter = require("../routers/products");
const orderRouter = require("../routers/orders");
const userRouter = require("../routers/users");

router.post("/login", auth.authenticate, auth.login);
router.use("/products", productRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);

module.exports = router;
