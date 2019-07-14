/* eslint-disable linebreak-style */
const express = require('express');
const app = express();      
app.use(express.json());

app.post('/endpoint/api/notify', (req, res) =>{
  console.log(req.body);
  res.status(200).send();
});




app.set('port', process.env.PORT || 7000);
app.listen(app.get('port'), ()=> console.log(`Listening on port ${app.get('port')}...`));