// const express = require('express');
// const app = express();
// const api = require('./routes/index');
// const cors = require('cors');

import express from 'express';
import index from './routes/index.js';
import datetime from './routes/datetime.js';
import cors  from 'cors';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import bodyParser from 'body-parser';
import nickname from './routes/nickname.js';
import geteventinfo from './routes/geteventinfo.js';
import available from './routes/available.js'
import getavailable from './routes/getavailable.js';


const app = express()


app.use(cors());
app.use(bodyParser.json());


app.use('/', index);
app.use('/datetime', datetime);
app.use('/nickname', nickname);
app.use('/geteventinfo', geteventinfo);
app.use('/available', available);
app.use('/getavailable', getavailable);



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("Connected to mongodb server");
})

mongoose.connect('mongodb://localhost:27017/BasicInfoDB');

const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}`))
