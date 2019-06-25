/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
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

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista    /////???????????????????????????
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista  /////???????????????????????????
    - Busqueda de canciones por genero 

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/


//Ejecuta la function correspondiente al fnName
function executeFunctionByName(fnName, array){
  const funciones ={};
  funciones['printArtistId'] = printArtistId; 
  funciones['addArtist'] = addArtist;
  funciones['getArtists'] = getArtists;
  funciones['removeArtist'] = removeArtist;
  funciones['addAlbum'] = addAlbum;
  funciones['printAlbumId'] = printAlbumId;
  funciones['getAlbums'] = getAlbums;
  funciones['removeAlbum'] = removeAlbum;
  funciones['albumWithTrackId']= albumWithTrackId;
  funciones['addTrack']= addTrack;
  funciones['printTrackId'] = printTrackId;
  funciones['getTracks']= getTracks;
  funciones['removeTrack'] = removeTrack;
  funciones['addPlaylist'] = addPlaylist;
  funciones['getPlaylists'] = getPlaylists;
  funciones['printPlaylistId'] = printPlaylistId;
  funciones['removePlaylist'] = removePlaylist;
  funciones['createPlaylist'] = createPlaylist;
  funciones['durationPlaylist'] = durationPlaylist;
  funciones['getTracksMachingGenres']= getTracksMachingGenres;
  funciones['addUser']=addUser;
  funciones['printUserId']=printUserId;
  funciones['hearAtrack']=hearAtrack;
  funciones['getUsers']=getUsers;
  funciones['userSongsListThisIs']=userSongsListThisIs;
  funciones['howManyTimesListenedATrack'] =howManyTimesListenedATrack;
  funciones['getArtistsMachingWithName'] =getArtistsMachingWithName;
  funciones['getAlbumsMachingWithName'] =getAlbumsMachingWithName;
  funciones['getTracksMachingWithName']=getTracksMachingWithName;
  funciones['getPlaylistsMachingWithName']=getPlaylistsMachingWithName;
  funciones['searchByName']=searchByName;
  funciones['getTracksArtistId']=getTracksArtistId;
  funciones['removeUser']= removeUser;
  funciones['songsListened']=songsListened;
  funciones['playlistAddTrack']=playlistAddTrack;
  funciones['populateAlbumsForArtist'] = populateAlbumsForArtist;
  funciones['getLyrics'] = getLyrics;
  funciones['getAlbumsForArtist'] = getAlbumsForArtist;
  funciones['getUNQfy'] =getUNQfy;
  funciones['saveUNQfy'] = saveUNQfy;

  if(funciones[fnName] === undefined){
    throw Error(`Error: comando ${fnName} no encontrado`);
  }
  
  return funciones[fnName](array);

  
}

//Controla que los parametros de la funcion llamada sean los requeridos
function controlParams(strName, args, strParam, num){
  checkParamsOfMore(strName, args, strParam, num);
  checkParamsOfless(strName, args, strParam, num);
  
}

//Controla que la funcion llamada no tenga mas parametros de los necesarios 
function checkParamsOfMore(strName, args, strParam, num){
  if(args.length > num){
    throw Error('Los parametros ['+ args.slice(num) + '] no son necesarios en la function '+ strName + 
      ' se requiere '+ strParam);
  }
}

//Controla que la funcion llamada no tenga menos parametros de los necesarios 
function checkParamsOfless(strName, args, strParam, num){
  if (args.length < num){
    throw Error(strName + ' requiere los parametros '+ strParam );
  }
}

//-------------------------------------- Artistas --------------------------------------------------------
//Agrega un artista a la unqfy
function addArtist(args) {
  controlParams('addArtist',args, 'un artistName y un artistCountry', 2);
  const unqfy = getUNQfy();
  unqfy.addArtist({name: args[0], country:args[1]});
  saveUNQfy(unqfy);
  console.log('Artista: '+ args[0] + ' se ha creado con exito');
  
}

//Elimina un artista de la unqfy
function removeArtist(args){
  controlParams('removeArtist',args,' un artistId', 1);
  const unqfy = getUNQfy();
  unqfy.removeArtist(Number(args[0]));
  saveUNQfy(unqfy); 
  console.log('artista con ID: ' + args[0] + ' se ha removido con exito');
}

//Retorna el artista correspondiente al ID
function printArtistId(...args){
  controlParams('printArtistId',args[0],'un artistId',1);
  const unqfy = getUNQfy();
  printArtista(unqfy.getArtistById(Number(args[0])));
}

//Imprime por consola un artista
function printArtista(artist){
  console.log('Artista ID: '+ artist.getId() + ', Nombre: ' + artist.getName()  + 
  ', albunes: [' + artist.getAlbums().map((album)=> ' ' +album.getName())  + '], Nacionalidad ' + artist.getCountry());
}
//retorna todos los artistas de la app
function getArtists(args){
  controlParams('getArtist ', args,  ' 0 parametros',0);
  const unqfy = getUNQfy();
  console.log('Artistas de la app');
  console.log(unqfy.getArtists());
}


//-------------------------------------- Albunes --------------------------------------------------------
//crea un album y lo agrega al artista correspondiente al ID 
function addAlbum(args){
  controlParams('addAlbum',args, 'artistId, albumName , albumYear',3);
  const unqfy = getUNQfy();
  unqfy.addAlbum(Number(args[0]), { name: args[1], year: args[2] });
  saveUNQfy(unqfy);
  console.log('Se ha agragado el album ' + args[1]+ ' al artista con ID: ' + args[0]);
  
}

//Remueve un albun correspondiente a la ID del artista que lo posea
function removeAlbum(args){
  controlParams('removeAlbum', args, ' albumId', 1);
  const unqfy = getUNQfy();
  unqfy.removeAlbumId(Number(args[0]));
  saveUNQfy(unqfy);
  console.log('Se ha removido el album con ID: '+ args[0]);
  

}

//Retorna el album correspondiente a la ID
function printAlbumId(args){
  controlParams('printAlbumId',args[0],'un albumId',1);
  const unqfy = getUNQfy();
  console.log(unqfy.getAlbumById(Number(args[0])));
}


//Retorna todos los albunes que tiene la app
function getAlbums(args){
  controlParams('getAlbums',args, '0 parametros',0);
  const unqfy = getUNQfy();
  console.log(unqfy.getAlbunes());
}

//Retorna un album que contiene el trackId
function albumWithTrackId(args){
  controlParams('albumWithTrackId',args,'trackId',1);
  const unqfy = getUNQfy();
  console.log(unqfy.getAlbumWithTrackId(Number(args[0])));
  
}

//-------------------------------------- Tracks --------------------------------------------------------

//agrega un track al album correspondiente al Id
function addTrack(args){ 
  checkParamsOfless('addTrack',args, 'albumId, trackName,trackDuraction y uno o varios trackGenres',4);
  const unqfy = getUNQfy();
  unqfy.addTrack(Number(args[0]), {name: args[1], duration: Number(args[2]), genres: args.slice(3)});
  saveUNQfy(unqfy);
  console.log('Se ha agregado el track ' + args[1] + ' al album con ID: ' + args[0]);
 
}

//Elimina el track correspondiente al ID
function removeTrack(args){
  controlParams('removeTrack',args,'trackId',1);
  const unqfy = getUNQfy();
  unqfy.removeTrack(Number(args[0]));
  saveUNQfy(unqfy);
  console.log('Se ha eliminado el track con ID: '+ args[0]);


}

//Retorna el track correspondiente al Id
function printTrackId(args){
  controlParams('printTrackId',args[0],'trackId',1);
  const unqfy = getUNQfy();
  console.log(unqfy.getTrackById(Number(args[0])));

}


//Retorna los tracks de la app
function getTracks(args){
  controlParams('getTracks',args,'0 parametros',0);
  const unqfy = getUNQfy();
  console.log(unqfy.getTracks());
}

//-------------------------------------------- Playlist --------------------------------------------------


//Agrega una playlist a la app sin tracks
function addPlaylist(args){
  controlParams('addPlaylist',args,'playlistName',1);
  const unqfy = getUNQfy();
  unqfy.addPlaylist(args[0]);
  saveUNQfy(unqfy);
  console.log('Se ha creado la Playlist ' + args[0]);
  
}

//Elimina la playlistId correspondiente al ID
function removePlaylist(args){
  controlParams('removePlaylistId',args, 'playlistId',1);
  const unqfy = getUNQfy();
  unqfy.removePlaylist(Number(args[0]));
  saveUNQfy(unqfy);
  console.log('se ha eliminado la Playlist con ID: ' + args[0]);
}

//Retorna la playList correspondiente al ID
function printPlaylistId(...args){
  controlParams('printPlaylistId',args[0], 'playlistId',1);
  const unqfy = getUNQfy();
  printPlaylist(unqfy.getPlaylistById(Number(args[0])));
}

//Agrega un track a la playlist 
function playlistAddTrack(args){
  controlParams('playlistAddTrack',args, 'una playlistId y un trackId',2);
  const unqfy = getUNQfy();
  unqfy.playListAddTrack(Number(args[0]),Number(args[1]));
  saveUNQfy(unqfy);
  console.log('se ha agregado el track con id '+ args[1]+  ' a la Playlist con ID: ' + args[0]);
  
}

//Imprime por consola la playList
function printPlaylist(playlist){
  console.log('Playlist Id: ' + playlist.getId() + ' Nombre: '+ playlist.getName() + ' tracks: ' + '[' +
    playlist.getTracks().map((elem) => ' '+elem.getName())  +']');
}

//Retorna todas las playlists de la app
function getPlaylists(args){
  controlParams('getPlaylists',args,'0 parametros',0);
  const unqfy = getUNQfy();
  unqfy.getPlaylists().forEach((play) => printPlaylist(play));
}

//Crea una playlist con los genreos incluidos y un tiempo max de duracion 
function createPlaylist(args){
  checkParamsOfless('createPlaylist',args, 'namePlaylist, uno o varios genreros, maxDuration',3);
  const unqfy = getUNQfy();
  unqfy.createPlaylist(args[0], args.slice(1,args.length -1), Number(args[args.length - 1]));
  saveUNQfy(unqfy);
  console.log('Se ha creado con exito la Playlist: ' + args[0]);
}

//retorna la duraccion de la playlist correspondiente al ID
function durationPlaylist(args){
  controlParams('durationPlaylist',args, 'playlistId',1);
  const unqfy = getUNQfy();
  console.log('Duracion de la Playlist con ID '+ args[0]+ ' es de: '+unqfy.durationPlaylist(Number(args[0])));

}

//----------------------------- Usuario ---------------------------------------------

//Agrega un usuario nuevo a la app
function addUser(args){
  controlParams('addUser',args,'userId',1);
  const unqfy = getUNQfy();
  unqfy.addUser(args[0]);
  saveUNQfy(unqfy);
  console.log('se ha agregado con exito el usuario: ' + args[0]);
}

//Elimina el usuario correspondiente al ID
function removeUser(args){
  controlParams('removeUser',args,'userId',1);
  const unqfy = getUNQfy();
  unqfy.removeUser(Number(args[0]));
  saveUNQfy(unqfy);
  console.log('se ha eliminado con exito el usuario: ' + args[0]);
  
}

//Retorna el usuario correspondiente al ID
function printUserId(...args){
  controlParams('addUser',args[0],'userId',1);
  const unqfy = getUNQfy();
  printUser(unqfy.getUserById(Number(args[0])));
  
}

function printUser(user){
  console.log(`User Id: ${user.getId()}, nombre:  ${user.getName() }, canciones escuchadas 
  [${user.songsListeneds().map((song) => ' ' +song.getName())}]`);
}

//Retorna todos los usuarios de la app
function getUsers(args){
  controlParams('getUsers',args,'o parametros',0);
  const unqfy = getUNQfy();
  unqfy.getUsers().forEach((user) =>printUser(user));
}

//El usuario correspondiente al Id escucha el track correspondiente al Id
function hearAtrack(args){
  controlParams('hearAtrack',args,'usserName, trackId',2);
  const unqfy = getUNQfy();
  unqfy.userHearAtrack(unqfy.getTrackById(Number(args[1])), unqfy.searchUser(args[0]));
  saveUNQfy(unqfy);
  console.log('El usuario '+ args[0] + ' ha escuchado el track con id '+ args[1]);
}

//Retorna las canciones mas escuchadas por el usuario
function userSongsListThisIs(args){
  controlParams('userSongsListThisIs',args,'usserName',1);
  const unqfy = getUNQfy();
  console.log('canciones mas escuchadas por el usuario '+ args[0] + ' son: '+ unqfy.userSongsListThisIs(args[0]).map((elem) => ' ['+elem.name +' escuchado '+ elem.cantidad + ' veces]'));
}

//Retorna las canciones  escuchadas por el usuario
function songsListened(args){
  controlParams('songsListened',args,'usserName',1);
  const unqfy = getUNQfy();
  console.log('canciones  escuchadas por el usuario '+ args[0] );
  console.log(unqfy.userSongsListeneds(args[0]).map((song) => ' ' +song.getName()));
}

//Retorna la cantidad de veces que el usuario correspondiente al name escucho un track
function howManyTimesListenedATrack(args){
  controlParams('howManyTimesListenedATrack',args,'usserName y trackId',2);
  const unqfy = getUNQfy();
  console.log('El usuario ' + args[0] +' ha escuchado el track con Id: ' 
  + args[1] + ' ' + unqfy.howManyTimesListenedATrack(args[0], Number(args[1])) + ' veces');

}



//------------------------------ Busquedas -------------------------------------------
//Retorna los tracks que tienen almenos uno de los generos pasados como argumento
function getTracksMachingGenres(args){
  checkParamsOfless('getTracksMachingGenres', args,'uno o varios tipos de genero', 1);
  const unqfy = getUNQfy();
  console.log(unqfy.getTracksMatchingGenres(args));
}

//Retorna los artistas que machean con el string pasado como argumento
function getArtistsMachingWithName(args){
  controlParams('getArtistsMachingWithName',args,'un string',1 );
  const unqfy = getUNQfy();
  console.log(unqfy.getArtistasMachingWithName(args[0]));
}



//------------------------------- VISADO2 -------------------------------------------------------

function populateAlbumsForArtist(args){
  const unqfy = getUNQfy();
  unqfy.populateAlbumsForArtist(args[0]);
  saveUNQfy(unqfy);
}

function getLyrics(args){
  const unqfy = getUNQfy();
  unqfy.getLyrics(Number(args[0]));
  saveUNQfy(unqfy);
}

function getAlbumsForArtist(args){
  const unqfy = getUNQfy();
  console.log(unqfy.getAlbumsForArtist(args[0]));
  saveUNQfy(unqfy);
}

//----------------------------------------------------------------------------------------------------------















//Retorna los albunes que machean con el string pasado como argumento
function getAlbumsMachingWithName(args){
  controlParams('getAlbumsMachingWithName',args,'un string',1 );
  const unqfy = getUNQfy();
  console.log(unqfy.getAlbumsMachingWithName(args[0]));
}

//Retorna los tracks que machean con el string pasado como argumento
function getTracksMachingWithName(args){
  controlParams('getTracksMachingWithName',args,'un string',1 );
  const unqfy = getUNQfy();
  console.log(unqfy.getTracksMachingWithName(args[0]));
}

//Retorna las playlists que machean con el string pasado como argumento
function getPlaylistsMachingWithName(args){
  controlParams('getPlaylistsMachingWithName',args,'un string',1 );
  const unqfy = getUNQfy();
  console.log(unqfy.getPlaylistsMachingWithName(args[0]));
}

//retorna los Artistas, Playlists, Albums, Tracks que macheen con el str
function searchByName(args){
  controlParams('searchByName',args,'un string',1 );
  const unqfy = getUNQfy();
  console.log(unqfy.searchByName(args[0]));
}

//retorna los tracks correspondientes al artistaId
function getTracksArtistId(args){
  controlParams('getTracksArtistId',args,'artistId',1 );
  const unqfy = getUNQfy();
  console.log(unqfy.getTracksMatchingArtist(Number(args[0])));
}
//---------------------------------------------------------------------------------------------------------

function main() {
  const params = process.argv.slice(2);
  const commandName = params[0];
  const commandArgs = params.slice(1);
 
  executeFunctionByName(commandName,commandArgs);

  //OTRA VERSION EJECUCION 
  //return eval(commandName)(commandArgs);
}
main();

