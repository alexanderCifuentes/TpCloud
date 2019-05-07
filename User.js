/* eslint-disable linebreak-style */
const CounterTrack = require('./CounterTrack');
class User{
  constructor (id, name){
    this.id = id;
    this.name = name;
    this.countersSong = [];  
  }

  //Retorna el Id del usser
  getId(){
    return this.id;
  }

  //Retorna el name del usser
  getName(){
    return this.name;
  }

  //El usuario escucha el track recibido como argumento
  hearATrack(track){
    this.addTracks(track);
  }

  //Agrega un counterTrack a su lista de counterTrack, si ya escuche el track 
  //aumenta 1 las veces que escucho el track
  addTracks(track){ 
    if(this.listenATrack(track)){
      this.getCounterTrackId(track.getId()).addListened();
    }else{ 
      const contTrack = new CounterTrack(track, track.getId());   
      this.countersSong.push(contTrack);
    }
  }

  //Retorna un booleano diciendo si escucho un track
  listenATrack(track){
    return this.songsListeneds().includes(track);
  }

  //Retorna un counterTrack correspondiente al ID puede retornar undefined
  getCounterTrackId(id){
    return  this.countersSong.find((cont) => cont.getId() === id); 
  }

  //Retorna los tracks que ha escuchado 
  songsListeneds(){
    return this.countersSong.map((cont) => cont.getTrack());
  }
  
  //Retorna cuantas veces escuche una cancion
  howManyTimesListenedATrack(trackId){
    const contTrack = this.getCounterTrackId(trackId);
    if(contTrack){
      return contTrack.getListened();
    }else{
      return 0;
    }
  }

  //Retorna los tracks mas escuchados
  listThisIs(){
    // eslint-disable-next-line no-nested-ternary
    // eslint-disable-next-line no-nested-ternary
    return this.countersSong.sort((a,b) =>(a.getListened() < b.getListened())?1 :
      ((b.getListened() < a.getListened())? -1: 0)).slice(0,3).map((count) => count.howManyTrack());
  
  }
  

}

module.exports = User;