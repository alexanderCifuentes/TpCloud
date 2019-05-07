/* eslint-disable linebreak-style */
const Playlist = require('./Playlist.js');

class Album extends Playlist{
  
  constructor(name, year, id){
    super(name, id);
    this.year = year;
    this.autor = undefined;
  }

  //Setea el autor del album
  setAutor(autor){
    this.autor =autor;
  }

  //Retorna el autor del album
  getAutor(){
    return this.autor;
  }

  //retorna el año del album
  getYear(){
    return this.year;
  }

  //Controla que el album no tenga un track con igual nombre
  checkTrackName(str){
    const tracksName = this.getTracks().map((track) => track.getName().toLowerCase()).reduce((a,b)=> a.concat(b),[]);  
    if(tracksName.includes(str.toLowerCase())){
      throw Error ('El track con nombre '+ str + ' ya existe');
      
    }
  }

  
}

module.exports = Album;