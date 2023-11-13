require('dotenv').config();
const express = require('express')
const app = express()
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const cors = require('cors')
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors(corsOptions));
app.use('/ad', require('./routes/advertisingRoutes'))
app.use('/balance', require('./routes/balanceRoutes'))
app.use(express.json());

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));

});

mongoose.connection.on('error', err => {
    console.log(err);
    logEvents(`${err.no} : ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})