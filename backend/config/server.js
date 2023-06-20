require("../config/db");
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const router = require('../router.js');
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
      origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
app.use(helmet())
app.use(cookieParser());

app.use('/', router);

module.exports = app;