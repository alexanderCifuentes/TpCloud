/* eslint-disable indent */

const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Artista = require('./Artista');
const Album = require('./Album');
const Track = require('./Track');
const Playlist = require('./Playlist');
const User = require('./User');
const CounterTrack = require('./CounterTrack');
const Buscador = require('./Buscador');

class UNQfy {

  constructor(){
    this.artistas = [];
    this.playlists =[];
    this.users =[];
    this.indexArtista = -1;
    this.indexAlbum = -1;
    this.indexTrack = -1;
    this.indexPlaylist = -1;
    this.indexUser = -1;
    this.buscador = new Buscador();
  }



  //------------------------------------------ Index ----------------------------------------------------
  
  //Check
  //retorna un Id para los artistas
  getIndexArtista(){
    this.indexArtista++;
    return this.indexArtista;
  }

  //Check
  //retorna un Id para los albunes
  getIndexAlbum(){
    this.indexAlbum++;
    return this.indexAlbum;
  }
  
  //Check
  //retorna un Id para los Tracks
  getIndexTrack(){
    this.indexTrack++;
    return this.indexTrack;
  }

  //Check
  //retorna un Id para los artistas
  getIndexPlaylist(){
    this.indexPlaylist++;
    return this.indexPlaylist;
  }
   
  //Check
  //retorna un Id para los Usuario
  getIndexUser(){
    this.indexUser++;
    return this.indexUser;
  }

  //Controla que hayan elementos en una lista en caso de no haber levanta una exception
  checkCantElements(array, str){
    if(array.length <= 0){
      throw Error(str); 
    }
  }

  //Controla que el elemento no sea un undefined
  checkElemento(obj,str){
    if (!obj){
      throw Error( str );
    }
  }

  //Controla que exista el index
  checkIndex(index, str,id){
    if(index < 0){
      throw Error('No se encontro '+ str+ ' correspondiente al ID: '+ id);
    }
  }


  //------------------------------------------ Artista ----------------------------------------------------
  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  //Check
  addArtist(artistData) {
    this.buscador.checkname(this.artistas, artistData.name, 'artistas');
    const artista = new Artista(artistData.name, artistData.country,this.getIndexArtista());
    this.artistas.push(artista);
    return artista;
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
  }

  //Check
  //remueve un artista de la lista de artistas
  removeArtist(id){
    const artista = this.buscador.elementoById(id, this.artistas);
    if(artista){
      const tracks = artista.getTracks();
      tracks.forEach((elem) => this.allPlaylistRemoveTrack(elem.getId()));
      
      const index = this.buscador.buscarIndex(artista.getId(),this.artistas);
      this.artistas.splice(index, 1);
    }else{
      throw Error('No se encontro el artista correspondiente al ID + '+ id);
    }
  }

  //Check
  //Retorna los artistas de la app
  getArtists(){
    this.checkCantElements(this.artistas, 'No hay artistas en la app');
    return this.artistas;
  }

  //Check
  //retorna un artista correspondiente al Id, podria retornar undefined
  getArtistById(id) {
    const artista = this.buscador.elementoById(id, this.artistas); 
    this.checkElemento(artista,'No se encontro el artista con el ID '+ id); 
    return artista; 
  }

  //Check
  //Retorna los track pertenecientes al artista ID
  getTracksArtist(id){
    const artista = this.getArtistById(id);   
    this.checkCantElements(artista.getTracks(),'El artista con Id '+ id + ' no tiene tracks');
    return artista.getTracks();
  }


  //Check
  //Retorna el artista con el trackId
  getArtistWithTrackId(id){
    const artista =  this.buscador.artistWithTrackId(id, this.artistas);
    this.checkElemento(artista,'Ningun artista tiene el track con ID '+ id);
    return artista;
  }

  //Retorna el artista con el albumId
  getArtistWithAlbumId(id){
    const artista =  this.buscador.artistaWithAlbumId(id, this.artistas);
    this.checkElemento(artista,'Ningun artista tiene el album con ID '+ id);
    return artista;
  }

  //------------------------------------------ Albums ----------------------------------------------------
  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  //Check
  addAlbum(artistId, albumData) {
    const artista = this.getArtistById(artistId);
    this.checkElemento(artista,'artista',artistId);
    const album = new Album(albumData.name, albumData.year,this.getIndexAlbum());
    artista.addAlbum(album);
    return album;
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
  }

  //Check
  //Elimina el album correspondiente a la ID
  removeAlbumId(id){ 
    const artista = this.getArtistWithAlbumId(id);
    const album = artista.getAlbumById(id);
    const tracks = album.getTracks();
    tracks.forEach((track) => this.allPlaylistRemoveTrack(track.getId()));
    artista.removeAlbum(id);
  }
  //Check
  //Retorna todos los albunes de la app
  getAlbunes(){
    const albunes = this.getArtists().map((art) => art.getAlbums()).reduce((a,b) => a.concat(b),[]);
    this.checkCantElements(albunes, 'No hay albunes en la app');
    return albunes;
    
  } 

  //Check
  //Retorna el album correspondiente al ID
  getAlbumById(id){ 
    return this.getArtistWithAlbumId(id).getAlbumById(id);
  }

  //Retorna el album que contiene el track correspondiente al ID
  getAlbumWithTrackId(id){
    const album =  this.getArtistWithTrackId(id).albumWithTrackId(id);  
    return album;
  }

  //--------------------------------------------- Tracks --------------------------------------------------
  
  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  //Check
  addTrack(albumId, trackData) {
    const track = new Track(trackData.name, trackData.duration,trackData.genres,this.getIndexTrack());
    const album = this.getAlbumById(albumId);
    album.checkTrackName(trackData.name);
    album.addTrack(track);
    return track;

  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
  }

  //Check
  //Elimina el track correspondiente de la ID
  removeTrack(id){
    this.allPlaylistRemoveTrack(id);
    this.getArtistWithTrackId(id).removeTrackId(id);
    
    
  }

  //Check
  //Retorna todos los tracks de la app
  getTracks(){
    const tracks = this.getAlbunes().map((album) => album.getTracks()).reduce((a,b) => a.concat(b),[]);
    this.checkCantElements(tracks,'No hay tracks en la app');
    return tracks;
  }

  //Check
  //retorna el track correspondiente al Id 
  getTrackById(id) {
    return this.getAlbumWithTrackId(id).getTrackById(id);
  }


  //-------------------------------------------- Playlist -----------------------------------------------
  //Check
  //Crea una playlist vacia y la agrega a la lista de playlists 
  addPlaylist(name){
    const playlist = new Playlist(name, this.getIndexPlaylist());
    this.playlists.push(playlist);
    return playlist;
  }

  //Check
  //Elimina la playlist correspondiente al ID
  removePlaylist(id){
    const index = this.buscador.buscarIndex(id,this.playlists);
    this.checkIndex(index, 'la playlist',id);
    this.playlists.splice(index, 1);
  }

  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  //Check
  createPlaylist(name, genresToInclude, maxDuration) {
    const tracks = this.getTracksMatchingGenres(genresToInclude);
    const myPlaylist = new Playlist(name, this.getIndexPlaylist());
    while( myPlaylist.duration() <= maxDuration && tracks.length > 0 ){
      
      if (myPlaylist.duration() + tracks[0].duration <= maxDuration){
        myPlaylist.addTrack(tracks.shift());
      }else{
        tracks.shift();
      }
    }
    this.checkCantElements(myPlaylist.getTracks(),'No se creo la playlist, ningun track coincide con alguno de los generos requeridos');
    this.playlists.push(myPlaylist);
    return myPlaylist;
    
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */

  }

  //Check
  //reorna la Playlist correspondiente al Id
  getPlaylistById(id) {
    const playlist =  this.buscador.elementoById(id, this.playlists);
    this.checkElemento(playlist,'No se encontro la playlist con Id '+ id);
    return playlist;
   }

  //Check
  //Retorna la duracion de la playlist correspondiente al ID
  durationPlaylist(id){
    return this.getPlaylistById(id).duration();
  } 
  
  //Check
  //Retorna todas las playlist de la app
  getPlaylists(){
    this.checkCantElements(this.playlists,'No hay playlist en la app');
    return this.playlists;
    
  } 

  //Check
  //Elimina el track correspondiente de la ID en todas las playlist
  allPlaylistRemoveTrack(id){
    this.playlists.forEach((play) => play.removeTrackId(id));
  }

  
  //Agrega el track correspondiente al iD a la playlist correspondiente al ID
  playListAddTrack(playId, trackId){
    this.getPlaylistById(playId).addTrack(this.getTrackById(trackId));
  }
  //------------------------------ Usuario----------------------------------------------
  
  //Check
  //Agrega un usuario nuevo a la app
  addUser(name ){
    this.buscador.checkname(this.users, name, 'usuarios');
    const user = new User(this.getIndexUser(), name);
    this.users.push(user);
    return user;

  }

  //Check
  //Retorna la cantidad de veces que el usuario correspondiente al name escucho un track
  howManyTimesListenedATrack(name, trackId){
    const user = this.buscador.searcForName(name, this.users);
    this.checkElemento(user,'usuario',name);
    return user.howManyTimesListenedATrack(trackId);
  }

  //Check
  //Retorna el usuario correspondiente al ID
  getUserById(id){
    const user = this.buscador.elementoById(id,this.users); 
    this.checkElemento(user,'No se encontro el usuario con ID '+ id); 
    return user;
  }

  //Check
  //Elimina el usuario correspondiente al id
  removeUser(id){
    const index = this.buscador.buscarIndex(id,this.users);
    this.checkIndex(index, 'el usuario',id);
    this.users.splice(index, 1);
  }

   //Check
  //Retorna las canciones escuchadas por el usuario correspondiente al userName
  userSongsListeneds(userName){
    return this.searchUser(userName).songsListeneds();
  }

   //Check
  // Retorna los usuarios de la app
  getUsers(){
    this.checkCantElements(this.users,'No hay usuarios en la app');
    return this.users;
  }

   //Check
  //pasa un track para que el usuario lo escuche
  userHearAtrack(track, user){
    user.hearATrack(track);
  }

   //Check
  //Retorna las canciones mas escuchadas por el usuario correspondiente al userName
  userSongsListThisIs(name){
    return this.searchUser(name).listThisIs();
    
  }
  //Retorna el usuario correspondiente al Name
  searchUser(userName){
    const user = this.buscador.searcForName(userName, this.users);
    this.checkElemento(user,'usuario',userName);
    return user;
  }

  //---------------------------- Busquedas -----------------------------------------

  //Check
  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos pasados como parametro 
  getTracksMatchingGenres(genres) {
    return this.buscador.tracksMatchingGenres(genres, this.getTracks());   
  }
 
  //modifico para que devuelva los tracks correspondientes al artistaId
  //artistId(number)
  getTracksMatchingArtist(artistId) {
    const tracks = this.getArtistById(artistId).getTracks();
    return tracks;
  }

  //retorna los artista que machean con el string pasado como parametro
  getArtistasMachingWithName(str){
   return this.buscador.elementosMachingWithString(str, this.artistas);
   
  }

  //retorna los albunes que machean con el string pasado como parametro
  getAlbumsMachingWithName(str){
    return this.buscador.elementosMachingWithString(str, this.getAlbunes());
   
  }

  //retorna los tracks que machean con el string pasado como parametro
  getTracksMachingWithName(str){
    return this.buscador.elementosMachingWithString(str, this.getTracks());
    
  }

  //retorna las playlists que machean con el string pasado como parametro
  getPlaylistsMachingWithName(str){
    return this.buscador.elementosMachingWithString(str, this.playlists);
    
  }

  //retorna los Artistas, Playlists, Albums, Tracks que macheen con el str
  searchByName(str){
    return {
      artists: this.getArtistasMachingWithName(str),
      albums: this.getAlbumsMachingWithName(str),
      tracks: this.getTracksMachingWithName(str),
      playlists: this.getPlaylistsMachingWithName(str),
    };   
  }

  save(filename) {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy,Artista,Album,Track,Playlist, User, CounterTrack,Buscador];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,Artista,Album,Track,Playlist, User, CounterTrack,Buscador
};

