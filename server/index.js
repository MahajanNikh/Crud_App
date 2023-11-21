// const express = require("express");
//  by using type = module in package.json  we can directly import it like react
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MongoURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB Connected Succesfully");
    app.listen(PORT, () => {
      console.log(`server is running on port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use('/api',route)