/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/*const express = require('express');
const unqmod = require('./unqfy');
const fs = require('fs'); 
//const JSON = require('circular-json');
const app = express();
app.use(express.json());
const joi = require('joi');
const rp = require('request-promise');


//---------------------------------- PERSISTENCIA ----------------------------------
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

//------------------------------- ARTISTA -------------------------------------------

//Check
//Msg de bienvenida
app.get('/', (req, res) =>{
    res.send('Bienvenido a la api de UNQfy');
});

//Crea un artista nuevo
app.post('/api/artists',  (req,res) =>{
    const schema ={
        name : joi.string().required(),
        country : joi.string().required()
    };

    const unqfy = getUNQfy();
    const result = joi.validate(req.body, schema);

    if(result.error){ res.status(400).send({status: 400, errorCode: 'BAD_REQUEST'}); return;} 
    
    const artista ={
        art : function(){ return unqfy.addArtist(req.body);} 
    };

    rp(artista)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));

    /*
    const artistData = req.body;
    const unqfy = getUNQfy();
    const artista =  unqfy.addArtist(artistData);
    res.status(201).send(
        {
        "id": artista.id,
        "name": artista.name,
        "country":artista.country,
        "albums": artista.albunes
        }
        );  
    saveUNQfy(unqfy);  */
/*
});

app.listen(3000,()=> console.log('Listening on port 3000...')); 
*/
/*
//Crea un artista nuevo
app.post('/api/artists',  (req,res) =>{
    
    const schema ={
        name : joi.string().required(),
        country : joi.string().required()
    };

    const result = joi.validate(req.body, schema);
    
    if(result.error){ res.status(400).send({status: 400, errorCode: 'BAD_REQUEST'}); return;} 
    
    
    const artistData = req.body;
    const unqfy = getUNQfy();
    const artista =  unqfy.addArtist(artistData);
    res.status(201).send(
        {
        "id": artista.id,
        "name": artista.name,
        "country":artista.country,
        "albums": artista.albunes
        }
        );  
    saveUNQfy(unqfy);  
});

//Check
//Devuelve un artista por Id
app.get('/api/artists/:id', (req,res)=>{
    const unqfy = getUNQfy();
    try{
        const artista = unqfy.getArtistById(parseInt(req.params.id));
        res.status(200).send( {
            'id': artista.id,
            'name': artista.name,
            'country':artista.country,
            'albums': artista.albunes
            
        });     
    }
    catch(e){
        res.status(404).send({
            status: 404,
            errorCode: "RESOURCE_NOT_FOUND"
            });
    } 
 });

//Check
//Elimina el artista correspondiente al Id
app.delete('/api/artists/:id', (req, res)=>{
    const unqfy = getUNQfy();
   try{
    unqfy.removeArtist(parseInt(req.params.id));
    res.status(204).send(); 
    saveUNQfy(unqfy); 
   }catch(e){
    res.status(404).send({
        status: 404,
        errorCode: "RESOURCE_NOT_FOUND"
        });
   }     
});

//Check
//Actualiza un artista 
app.patch('/api/artists/:id', (req,res)=>{
    const unqfy = getUNQfy();
    try{
        const artist = unqfy.getArtistById(parseInt(req.params.id));
        const artistData = req.body;
        const artista = unqfy.updateArtista(artistData,artist);
        res.status(200).send({
            'id': artista.id,
            'name': artista.name,
            'country':artista.country,
            'albums': artista.albunes
            });     
    saveUNQfy(unqfy);
    }catch(e){
        res.status(404).send({
            status: 404,
            errorCode: "RESOURCE_NOT_FOUND"
            });
    }
    
    
    
});



//Falta el check
app.get('/api/artists', (req, res)=>{

    const unqfy = getUNQfy();
    const query = req.body.name;    
    /*
    if(query === undefined){
        res.status(400).send({
            status: 400,
            errorCode: "BAD_REQUEST"
            }
            );
        
      
    }
    const artistas = unqfy.getArtistasMachingWithName(query);
    res.status(200).send(artistas);
    
});*/











//---------------------------------- ALBUMS ----------------------------------------------

/*
//Crea un album nuevo
app.post('/api/albums', (req,res)=>{
    const schema ={
        name : joi.string().required(),
        artistId : joi.string().required(),
        year : joi.string().required()
    };
    const result = joi.validate(req.body, schema);
    if(result.error){ res.status(404).send({status: 404, errorCode: 'BAD_REQUEST'}); } 
    const unqfy = getUNQfy();
    try{
        const artista = unqfy.getArtistById(Number(req.body.artistId));
        const albumData = {name: req.body.name, year: req.body.year };
        const album = unqfy.addAlbum(artista.id, albumData);
        res.status(201).send({
            "id": album.id,
            "name": album.name,
            "year": album.year,
            "tracks": album.tracks
            });
    saveUNQfy(unqfy);      
    }catch(e){
        res.status(404).send({ status: 404, errorCode: 'BAD_REQUEST' } );
    }

    app.post('/',(req,res) =>{

        if(!req.path.slice(1).startsWith('api')){
        res.status(404).send({
            status: 404,
            errorCode: "RESOURCE_NOT_FOUND"
            }
            );
        }

    });
    
      
});
 


    
      








/*

 app.get('/api/albums', (req, res)=>{
    const unqfy = getUNQfy();
    const albunes = unqfy.getAlbunes();
    if(!albunes) res.status(404).send('No hay albunes en la app');
    res.send(JSON.stringify(albunes));
});



//--------------------------------- POST ------------------------------------------



app.post('/api/albums', (req,res)=>{
    const schema ={
        name : joi.string().required(),
        year : joi.string().required(),
        artistId : joi.string().required()
    };

    const result = joi.validate(req.body, schema);
    const albumData = {name: req.body.name, year: req.body.year };
    const artistId = req.body.artistId;
    const unqfy = getUNQfy();
    if(result.error){ res.status(404).send(result.error.details[0].message); return;} 
    res.send(JSON.stringify(unqfy.addAlbum(Number(artistId), albumData)));  
    saveUNQfy(unqfy);  
});

//-------------------------- DELETE ---------------------------------------------------

//Check


app.delete('/api/album/:id', (req, res)=>{
    const unqfy = getUNQfy();
    unqfy.removeAlbumId(parseInt(req.params.id));
    saveUNQfy(unqfy); 
    res.send(`Album con id ${req.params.id}  ha sido eliminado`);     
});


//-------------------------PATCH  --------------------------------------------------------

//Check
*/



/* 
    */