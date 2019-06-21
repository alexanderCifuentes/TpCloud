/* eslint-disable quote-props */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const express = require('express');
const app = express();      
app.use(express.json());  

const unqmod = require('./unqfy');
const fs = require('fs'); 
const rp = require('request-promise');


//---------------------------------- PERSISTENCIA ----------------------------------------------------------
function getUNQfy(filename = 'data.json') {
    let unqfy = new unqmod.UNQfy();
    if (fs.existsSync(filename)) {
      unqfy = unqmod.UNQfy.load(filename);
    }
    return unqfy;
  }
  
function saveUNQfy(unqfy, filename = 'data.json') {
    unqfy.save(filename);
  }

//-------------------------------------- GET --------------------------------------------------------------

app.get('/', (req, res) =>{
  res.send('Bienvenido a la api de UNQfy');
});



//Check
//Rutas invalidas
app.get('*', (req, res) =>{
  res.status(404).send({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND'
    });
});

//-------------------------------------- POST --------------------------------------------------------------


app.post('/api/artists', (req, res) =>{
  
  const artistData = req.body;
  
  try{
    
    const unqfy = getUNQfy();
    const artista = unqfy.addArtist(artistData);
    saveUNQfy(unqfy);
    res.status(201).send({
      'id': artista.id,
      'name': artista.name,
      'country':artista.country,
      'albums': artista.albunes
      });
  }catch(error){
    
    if(error === 409){ res.status(409).send({ status: 409, errorCode: 'RESOURCE_ALREADY_EXISTS'});}
    if(error === 400){res.status(400).send({ status: 400, errorCode: 'BAD_REQUEST'});}
  }
  
});




//Check
//Rutas invalidas
app.post('*', (req, res) =>{
  res.status(404).send({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND'
    });
});

//-------------------------------------- PUT --------------------------------------------------------------
//Check
//Rutas invalidas
app.put('*', (req, res) =>{
  res.status(404).send({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND'
    });
});
//-------------------------------------- DELETE --------------------------------------------------------------
//Check
//Rutas invalidas
app.delete('*', (req, res) =>{
  res.status(404).send({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND'
    });
});

//-------------------------------------- PATCH --------------------------------------------------------------
//Check
//Rutas invalidas
app.patch('*', (req, res) =>{
  res.status(404).send({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND'
    });
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=> console.log(`Listening on port ${app.get('port')}...`));