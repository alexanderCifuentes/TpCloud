/* eslint-disable linebreak-style */
class Track{

  constructor(name,duracion,genres, id){
    this.id =id;
    this.name = name;
    this.duration = duracion;
    this.genres = genres;
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
  

}

module.exports = Track;