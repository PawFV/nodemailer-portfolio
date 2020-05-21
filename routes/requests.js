const express = require('express');
const router = express.Router();
const mailer = require('../mailer');

router.get('/', (req, res) => {
   res.send("hola");
})

router.post('/', async (req, res) => {
   data = req.body
   if (!data) return res.status(400);

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

      res.status(200).json({ message: "Thank you! I received your message!" })
   } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Sorry something went wrong" });
   }
})

module.exports = router;