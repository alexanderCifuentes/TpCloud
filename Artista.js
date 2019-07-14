/* eslint-disable linebreak-style */
const Spotyfy = require('./Spotyfy');
const Album = require('./Album');


class Artista{
  constructor(unName, unCountry, id){
    this.id = id;
    this.name = unName;
    this.albums =[];
    this.country = unCountry;
    
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
    return this.albums;
  }

  update(name, country){
    this.name = name;
    this.country = country;

  }

  //---------------------Artista albunes-----------------------------------------------------------

  //Agrega un album a la lista de albunes y le setea el autor del album
  addAlbum(album){
    this.checkNameAlbum(album.getName());
    this.albums.push(album); 
    
  }

  //Elimina el album correspondiente al ID de su lista de albunes
  removeAlbum(id){
    
    const index = this.albums.findIndex((album) => album.id === id);
    console.log(index);
    if(index > -1){
      this.albums.splice(index, 1);
    }
  }

  //retorna el album correspondiente al Id, podria retornar undefined
  getAlbumById(id){
    return this.albunes.find((album) => album.id === id);
  }

  //retorna un booleano que indica si contiene el album correspondiente al Id
  containAlbumId(id){
    const albumsID = this.albums.map((alb) => alb.id);
    return albumsID.includes(id);
  }

  //retorna el album que contiene el track correspondiente al Id, Podria retornar undefined
  albumWithTrackId(id){
    return this.albums.find((alb) => alb.containTrack(id));
  }
  
  //---------------------------------- Artista Track ----------------------------------------------------
  //retorna un booleano que indica si alguno de sus albunes contiene el track correspondiente al Id
  containTrackId(id){
    const album = this.albumWithTrackId(id); 
    return this.albums.includes(album);
  }

  //Retorna el track correspondiente al ID
  getTrackId(trackId){
    return this.albumWithTrackId(trackId).getTrackById(trackId);
  }

  //retorna los tracks que tienen cada uno de sus albunes
  getTracks(){
    if(this.albums.length > 0){
      return this.albums.map((album) => album.tracks).reduce((a,b) => a.concat(b),[]);
    }else{
      return [];
    } 
  }

  // retorna: los tracks que contenga alguno de los generos pasados como parametro 
  getTracksMatchingGenres(genres) {
    return this.getTracks().filter((track) => track.containSomeGenres(genres));
  }

  //Controla que no haya un album con igual nombre en el artista
  checkNameAlbum(str){
    const name = this.albums.find((album)=> album.getName().toLowerCase() === str.toLowerCase());
    if(name !== undefined){
      throw ({cod: 409, message:'El nombre ya existe'});
    }
  }

  //Elimina el track correspondiente al Id
  removeTrackId(id){
    this.albumWithTrackId(id).removeTrackId(id);
  }
  //--------------------------------- VISADO2 -----------------------------------------

  addAlbumsOfSpotify(){
    //if(!this.consultaSpotify){
    const spotify = new Spotyfy();
    spotify.queryAlbumsArtist(this);
      //this.consultaSpotify = true;}
  }
  

  addAlbumsConsultaSpotify(lista){
    lista.forEach((element) => this.albums.push(this.newAlbum(element))); 
  }

  newAlbum(ele){
    const album = new Album(ele.name, ele.release_date, ele.id);
    return album;
  }


  

}

module.exports = Artista;