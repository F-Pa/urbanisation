const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const routeUrls = require('./routes/routes')

const app = express();

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"))

app.use(express.json())
app.use(cors())
app.use('/app', routeUrls)
app.listen(4000, () => console.log("Server is up and running"))