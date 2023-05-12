const express = require("express");
const app = express();

// load the environment variables from the env file
require("dotenv").config();

// to parse automatically
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connect to the db
require("./db/config");

///////////////////////////////////////////////////////

// routers
const donateRouter = require("./routers/donation");
const registerRouter = require("./routers/register");
const productRouter = require("./routers/search");

app.use(donateRouter);
app.use(registerRouter);
app.use(productRouter);

///////////////////////////////////////////////////////

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
