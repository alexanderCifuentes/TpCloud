/* eslint-disable linebreak-style */

class CounterTrack{
  constructor(track, trackId){
    this.listened = 1;
    this.track = track;
    this.id = trackId;
  }

  //Retorna las veces que se escucho el track
  getListened(){
    return this.listened;
  }

  //Retorna el Id
  getId(){
    return this.id;
  }

  //Retorna el track
  getTrack(){
    return this.track;
  }

  //Suma una ves a las veces escuchado
  addListened(){
    this.listened ++;
  }

  //Retorna un objeto indicando el nombre del track y cuantas veces lo escucho 
  howManyTrack(){
    return { name :this.track.getName() , cantidad: this.getListened()};
  }


  
}



module.exports = CounterTrack;