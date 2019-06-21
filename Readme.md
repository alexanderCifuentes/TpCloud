//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Init

node main.js addArtist Juanes COL
node main.js addArtist Mana MEX
node main.js addArtist Kraken COL
node main.js addArtist Callejeros ARG
node main.js addArtist Redonditos ARG

node main.js addAlbum 0 Solo 1995
node main.js addAlbum 1 Mariposa 2003
node main.js addAlbum 2 "Lenguaje"  1997
node main.js addAlbum 3 Senales  2006
node main.js addAlbum 4 Oktubre 1986

node main.js addTrack 0 "De madrugada" 237 Rock Pop
node main.js addTrack 1 "Mil amores" 280  Pop
node main.js addTrack 2 "Vestido de cristal" 305  Pop
node main.js addTrack 3 Creo 280  Pop Rock
node main.js addTrack 4 Jijiji 305  Pop

node main.js addTrack 0 Silencio  310 Song Live
node main.js addTrack 1 Litle 320  Music Song 
node main.js addTrack 2 Pliz  300 Song Live salsa
node main.js addTrack 3 Prohibido 280  Pop
node main.js addTrack 4 "Amor frances" 305  Pop Rock

node main.js addTrack 0 "Cd Complet"  2110 Song Live salsa Pop Rock
node main.js addTrack 1 "En vivo"  2320  Music Rock Love  
node main.js addTrack 2 "Desde Rusia"  2414 Song Live
node main.js addTrack 1 Clasicos 2155  Pop Rock 
node main.js addTrack 2 Compilado 3050  Pop

node main.js createPlaylist "My Playlist" Rock Pop 1000
node main.js createPlaylist "Ruidos" Song 2000
node main.js createPlaylist "Noches de luna" Rock Pop music 1000
node main.js createPlaylist "Unos Tracks" Rock Pop vals 3000
node main.js createPlaylist "Clasicos" salsa Bachata  Rock 1200


node main.js addUser Alexander
node main.js addUser Lucia
node main.js addUser Pablo
node main.js addUser Micaela





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Busquedas

node main.js getArtists
node main.js getAlbums
node main.js getTracks
node main.js getPlaylists
node main.js getUsers

node main.js printArtistId 0
node main.js printAlbumId 3
node main.js printTrackId 7
node main.js printPlaylistId 1
node main.js printUserId 0

node main.js removeArtist 0
node main.js removeAlbum 1
node main.js removeTrack 2
node main.js removePlaylist 0
node main.js removeUser 1

node main.js hearAtrack Alexander 4
node main.js howManyTimesListenedATrack Alexander 5
node main.js userSongsListThisIs Alexander
node main.js songsListened Alexander


node main.js getTracksMachingGenres Pop

node main.js getArtistsMachingWithName Ma
node main.js getAlbumsMachingWithName Ma
node main.js getTracksMachingWithName Ma
node main.js getPlaylistsMachingWithName Ma
node main.js searchByName Ma

node main.js getTracksArtistId 2


node main.js durationPlaylist 1

node main.js playlistAddTrack 4 7
node main.js populateAlbumsForArtist Juanes






















