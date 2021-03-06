const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const cors = require('cors');

const bodyParser = require('body-parser');
require('dotenv').config()
app.use(cors())

// BODY PARSER
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/mailer', require('./routes/requests'));




app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
