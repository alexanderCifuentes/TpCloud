/* eslint-disable linebreak-style */

class Playlist {
  constructor(name, id){
    this.id = id;
    this.name = name;
    this.tracks = [];
  }

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
  
  //retorna un booleano que indica si la lista de tracks contiene un track
  hasTrack(aTrack){
    //const track = this.getTracks().find((tr) => tr.getName() === aTrack.getName());
    return  this.tracks.includes(aTrack);//track !== undefined;
  }

  //retorna la duracion total de la playlist
  duration(){
    return this.getTracks().map((track) => track.getDuration()).reduce((a,b) => a+b,0);  
  }

}

module.exports = Playlist;