const express = require("express");
const ExpressError = require("./expressError");
const app = express();
const itemRoutes = require("./router");
const middleware = require("./middleware");

app.use(express.json());

// this applies to all requests at all paths
app.use(middleware.logger);
// end middleware.logger

//  apply a prefix to every route in userRoutes
app.use("/items", itemRoutes);
// end userRoutes

// route handler with middleware



module.exports = app;