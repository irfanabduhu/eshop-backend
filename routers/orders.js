const Router = require("express").Router;
const auth = require("../auth/index");
const Orders = require("../controllers/orders");

const orderRouter = Router();
orderRouter.get("/", auth.hasAdminAccess, Orders.getAll);
orderRouter.get("/:id", Orders.get);
orderRouter.post("/", auth.hasUserAccess, Orders.create);
orderRouter.put("/:id", auth.hasUserAccess, Orders.updateInfo);
orderRouter.put("/:id/status", auth.hasAdminAccess, Orders.updateStatus);
orderRouter.delete("/:id", auth.hasUserAccess, Orders.remove);

module.exports = orderRouter;
