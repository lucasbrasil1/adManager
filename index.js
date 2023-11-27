require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));
app.use(express.json());

app.use('/ad', require('./routes/advertisingRoutes'))

app.listen(PORT, () => console.log(`Server running on ${PORT}`));