const Router = require("express").Router;
const auth = require("../auth/index");
const Users = require("../controllers/users");

const userRouter = Router();
userRouter.get("/", auth.hasAdminAccess, Users.getAll);
userRouter.get("/:username", auth.hasUserAccess, Users.get);
userRouter.post("/", Users.createUser);
userRouter.put("/:username/role", auth.hasSuperAdminAccess, Users.updateRole);
userRouter.put("/:username", Users.updateInfo);
userRouter.delete("/:id", auth.hasSuperAdminAccess, Users.remove);

module.exports = userRouter;
