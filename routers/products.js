const Router = require("express").Router;
const auth = require("../auth/index");
const Products = require("../controllers/products");

const productRouter = Router();
productRouter.get("/", Products.getAll);
productRouter.get("/:id", Products.get);
productRouter.post("/", auth.hasAdminAccess, Products.create);
productRouter.put("/:id", auth.hasAdminAccess, Products.update);
productRouter.delete("/:id", auth.hasAdminAccess, Products.remove);

module.exports = productRouter;
