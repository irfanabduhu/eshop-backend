const express = require("express");
const apiRouter = require("./routers/api");

const app = express();

app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
