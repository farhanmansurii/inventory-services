const express = require('express');
const app = express();
const cors = require('cors');
const formRoute = require('./routes/formRoute');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
app.use(express.json());
app.use(cors());
const uri =process.env.MONGO_DB

mongoose.connect(uri).then(() => console.log('Connected to the database successfully'));

app.listen(3000, () => console.log('Server up and running'));

app.use('/', formRoute);
