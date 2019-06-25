/* eslint-disable indent */
/* eslint-disable linebreak-style */
const rp = require('request-promise');


class Musixmatch{

  getLyrics(track){
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
    const options = {
      uri: BASE_URL + '/track.search',//'/matcher.track.get',
      qs: {
        apikey: '3890c790db91d08cff064fbebf1defc5',
        q_track_artist : track.name,},
      json: true 
    };
    rp.get(options).then((response) =>{const header = response.message.header;
      const body = response.message.body;
      const id =body.track_list[0].track.track_id;
      if (header.status_code !== 200){
      throw new Error('status code != 200');}
      this.getLiricsForId(id,track);
    })
    .catch((error) => {
      console.log('No se encontro el track en musixmatch', error);});
  }

  getLiricsForId(id, track){
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
    const options = {
      uri: BASE_URL + '/track.lyrics.get',
      qs: {
        apikey: '3890c790db91d08cff064fbebf1defc5',
        track_id : id}, 
      json: true 
    };

    rp.get(options).then( (response) => {const header = response.message.header;
      const body = response.message.body;
      
      if (header.status_code !== 200){throw new Error('El track no contiene lyrics');}
      track.lyric = body.lyrics.lyrics_body;
      console.log(track);
      //console.log(body.lyrics.lyrics_body);
        
    })
    
    .catch((error) => {console.log(error);});
  }


}

module.exports = Musixmatch;

 /*
    const BASE_URL = 'http://api.musixmatch.com/ws/1.1';
    const options = {
      uri: BASE_URL + '/track.lyrics.get',
      qs: {
        apikey: '3890c790db91d08cff064fbebf1defc5',
        track_id : 15953433}, 
      json: true 
    };*/