/* eslint-disable linebreak-style */
const rp = require('request-promise');
const Musixmatch = require('./Musixmatch');
class Track{

  constructor(name,duracion,genres, id){
    this.id =id;
    this.name = name;
    this.duration = duracion;
    this.genres = genres || [];
    this.lyric = null;
  }

  //retorna un booleano indicando si contiene alguno de los generos pasados como parametro
  containSomeGenres(arrayGeneros){
    const genTrack = this.genres.map((gen) => gen.toLowerCase());  
    return arrayGeneros.map((ele) => ele.toLowerCase()).some((genre) => genTrack.includes(genre));
    
  }

  //Retorna su duracion
  getDuration(){
    return this.duration;
  }
  
  //Retorna el name
  getName(){
    return this.name;
  }

  //Retorna el id
  getId(){
    return this.id;
  }

  //Retorna los generos que contiene
  getGenres(){
    return this.genres;
  }
  

  //---------------------------------- VISADO2 -------------------------------------

  
  //-------------------------------------------------------------------------------------
  getLyrics(){
    
    //if(!this.lyric){
    const musi = new Musixmatch();  
    musi.getLyrics(this);
    //}
    //return console.log(this.lrcs);
  }




}

module.exports = Track;