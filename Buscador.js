/* eslint-disable linebreak-style */

class Buscador{

    
  //Retorna el elemento correspondiente al Id, podria retorna undefined
  elementoById(id, array){
    return array.find((ele) => ele.getId() === id);
  }

  //Retormna el index de un elemento dentro de una listta segun su Id, podria retornar -1
  buscarIndex(id,array){
    return array.findIndex((elem) => elem.getId() === id);
  }

  //Retorna el artista con el album id, podria retornar undefined si ningun artista tiene el albunId
  artistaWithAlbumId(id, artistas){
    return artistas.find((art) => art.containAlbumId(id));
  }

  //Retorna el artista con el track id, podria retornar undefined si ningun artista tiene el trackId
  artistWithTrackId(id, artistas){
    return artistas.find((art) => art.containTrackId(id));
  }

  //Controla que no exista ese nombre en la lista, en caso de existir lanza una exception
  checkname(array, strName, str){
    const nombres = array.map((elem) => elem.getName().toLowerCase());
    if(nombres.includes(strName.toLowerCase())){
      throw Error('El nombre ' + strName +' ya existe en '+str);
    }
  }

  //Retorna un elemento que coincide con el name
  searcForName(name, array){
    return array.find((ele) => ele.getName().toLowerCase() === name.toLowerCase());

  }
  //Retorna los elementos de una lita que hacen match con el str
  elementosMachingWithString(str, array){
    return array.filter((ele) => ele.getName().toLowerCase().match(str.toLowerCase()));
  } 

  //Retorna los tracks que contengan al menos uno de los generos pasados como argumento
  tracksMatchingGenres(genres, arrayTracks){
    return arrayTracks.filter((track) => track.containSomeGenres(genres));

  }



}
module.exports = Buscador;