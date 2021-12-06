const express = require("express");
const morgan = require("morgan");
require("dotenv/config");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/errorHandler");

app.use(cors());
app.options("*", cors());

//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

//Routing
const productsRouter = require("./routes/productsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const userRouter = require("./routes/usersRouter");
const ordersRoutes = require("./routes/ordersRouter");

const api = process.env.API_URL;

app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, ordersRoutes);

mongoose
  .connect(process.env.MONGO_DB_CONN_STRING)
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log(err);
  });

//Development
// app.listen(3000, () => {
//   console.log(`Server is running at http://localhost:3000`);
// });

//Production
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port" + port);
});
