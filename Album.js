/* eslint-disable linebreak-style */

class Album {
  
  constructor(name, year, id){
    this.id = id;
    this.name = name;
    this.year = year;
    this.tracks = [];
    
  }

  //--------------------------------------------------

  //Retorna el Id 
  getId(){
    return this.id;
  }

  //Retorna el name
  getName(){
    return this.name;
  }

  //agrega un track a su lista de tracks
  addTrack(track){
    this.tracks.push(track);
    
  }
  
  //Elimina el track correspondiente al ID de su lista de tracks
  removeTrackId(id){
    const index = this.getTracks().findIndex((track) => track.id === id);
    if(index > -1){
      this.getTracks().splice(index, 1);
    }
  }

  //retorna todos sus tracks
  getTracks(){
    return this.tracks;
  }

  //retorna el track correspondiente al Id, podria retornar un undefined
  getTrackById(id){
    return this.getTracks().find((track) => track.id === id);
  }
  
  //retorna un booleano que indica si contiene el track correspondiente al Id
  containTrack(id){
    const track = this.getTrackById(id);
    return this.getTracks().includes(track);
  }



  //-------------------------------------------------

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
      throw ({cod: 409, message:'El nombre ya existe'});
      
    }
  }


  //------------------------------------------ VISADO2 ------------------------------------------------------
  update(name, year){
    this.name = name || this.name;
    this.year = year || this.year;
  }
  
}

module.exports = Album;