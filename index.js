const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500
const mailer = require('./mailer');
const bodyParser = require('body-parser');
require('dotenv').config()
var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://paw-webdev.web.app"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// BODY PARSER
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res) => {
res.send("hola");
})

app.post('/', async (req, res) => {
   data = req.body
   res.setHeader("Access-Control-Allow-Origin", '*');
   res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
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
