const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const mailer = require('./mailer');
const bodyParser = require('body-parser');
require('dotenv').config()
var cors = require('cors');

app.use(cors());

// BODY PARSER
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.post('/', async (req, res) => {
   data = req.body

   console.log(data)
   try {
      const html = ` 
      <body>
      <h3>Nombre: <small>${data.name}</small> </h3>    
      <h3>Email: <small>${data.email}</small>  </h3>      
      <h3>Mensaje:</h3>
       <p>${data.message}</p>
      <br/> <br/>
      </body>
      `
      await mailer.sendEmail(process.env.EMAIL, process.env.PAW_EMAIL, 'Alguien te ha contactado desde tu portfolio', html);

      res.json({ message: "Thank you! I received your message!" })
   } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Sorry something went wrong" });
   }
})


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
