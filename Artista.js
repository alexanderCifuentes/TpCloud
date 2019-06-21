/* eslint-disable linebreak-style */
class Artista{
  constructor(unName, unCountry, id){
    this.id = id;
    this.name = unName;
    this.country = unCountry;
    this.albunes =[];
  }

  //Retorna el name del artista
  getName(){
    return this.name;
  }

  //Retorna el ID del artista
  getId(){
    return this.id;
  }

  //Retorna el country del artista
  getCountry(){
    return this.country;
  }

  //Retorna todos los albunes que posee
  getAlbums(){
    return this.albunes;
  }

  update(name, country){
    this.name = name;
    this.country = country;

  }

  //---------------------Artista albunes-----------------------------------------------------------

  //Agrega un album a la lista de albunes y le setea el autor del album
  addAlbum(album){
    this.checkNameAlbum(album.getName());
    album.setAutor(this);
    this.albunes.push(album); 
    
  }

  //Elimina el album correspondiente al ID de su lista de albunes
  removeAlbum(id){
    const index = this.albunes.findIndex((album) => album.id === id);
    if(index > -1){
      this.albunes.splice(index, 1);
    }
  }

  //retorna el album correspondiente al Id, podria retornar undefined
  getAlbumById(id){
    return this.albunes.find((album) => album.id === id);
  }

  //retorna un booleano que indica si contiene el album correspondiente al Id
  containAlbumId(id){
    const album = this.getAlbumById(id);
    return this.albunes.includes(album);
  }

  //retorna el album que contiene el track correspondiente al Id, Podria retornar undefined
  albumWithTrackId(id){
    return this.albunes.find((alb) => alb.containTrack(id));
  }
  
  //---------------------------------- Artista Track ----------------------------------------------------
  //retorna un booleano que indica si alguno de sus albunes contiene el track correspondiente al Id
  containTrackId(id){
    const album = this.albumWithTrackId(id); 
    return this.albunes.includes(album);
  }

  //Retorna el track correspondiente al ID
  getTrackId(trackId){
    return this.albumWithTrackId(trackId).getTrackById(trackId);
  }

  //retorna los tracks que tienen cada uno de sus albunes
  getTracks(){
    return this.albunes.map((album) => album.tracks).reduce((a,b) => a.concat(b),[]); 
  }

  // retorna: los tracks que contenga alguno de los generos pasados como parametro 
  getTracksMatchingGenres(genres) {
    return this.getTracks().filter((track) => track.containSomeGenres(genres));
  }

  //Controla que no haya un album con igual nombre en el artista
  checkNameAlbum(str){
    const name = this.albunes.find((album)=> album.getName().toLowerCase() === str.toLowerCase());
    if(name !== undefined){
      throw Error('Nombre de album ya existe');
    }
  }

  //Elimina el track correspondiente al Id
  removeTrackId(id){
    this.albumWithTrackId(id).removeTrackId(id);
  }


}

module.exports = Artista;