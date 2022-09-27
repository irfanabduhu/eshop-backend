const express = require("express");
const apiRouter = require("./routers/api");
const middleware = require("./middlewares/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.use(middleware.handleError);
app.use(middleware.notFound);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
