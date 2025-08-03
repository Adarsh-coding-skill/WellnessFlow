const express = require('express');
const {config} = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {dbConnection} = require('./DataBase/dbConnection')
const authRouters = require('./routers/authRouters')
const sessionRouters = require('./routers/sessionRouters')
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT","PATCH"],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
config({path: './Config/config.env'});

app.use("/api/v1/user", authRouters);
app.use("/api/v1", sessionRouters);

config();

dbConnection();

module.exports = app;