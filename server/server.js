require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./router/auth-router");
const adminRoute = require("./router/admin-router");
const urlRoute = require("./router/url-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();

app.use(cors());

app.use(express.json());   //middleware

app.use("/api/auth", authRoute);  //route

app.use("/api/admin", adminRoute);

app.use("/api/url", urlRoute);

app.use(errorMiddleware);

const PORT = 5004;

connectDb().then(() =>{
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
});
  