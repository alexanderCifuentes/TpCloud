/* eslint-disable linebreak-style */

const rp = require('request-promise');



class Query{

  constructor(){
    this.token = 'BQBYDUrcd1MxDZ7UZM1bsPYGbFLEOA2kl_Iy8d5p17dDXCpJ93H7fu-6ftRai8fz61f2i7mG9AU3ZlpfeA_f-y7Q9wq5qXoBnqfno8AAb_K37GGWJiNGk7PniOOAKNrjbdPgjMmc1xEvVCZUI26z2e1NQj5tE_D6k0-qLuenRyOFXbEWZ_N2';
    
  }




  queryAlbumsArtist(artistName){
    const options = {
      url: 'https://api.spotify.com/v1/search',
      qs: { q : artistName,
        type: 'artist'},
      headers: { Authorization: 'Bearer ' + this.token },
      json: true,
    };
    //rp.get(options).then((response) => console.log(response.artists.items.find((Ar)=> Ar.name.toLowerCase() === artistName.toLowerCase()).id)); }
    rp.get(options).then((response) => this.queryIdArtist(response.artists.items.find((Ar)=> Ar.name.toLowerCase() === artistName.toLowerCase()).id));
  }
                
  queryIdArtist(id){
    const options = {
      
      url: 'https://api.spotify.com/v1/artists/'+id+'/albums?',
      qs: { type: 'album'},
      headers: { Authorization: 'Bearer ' + this.token },
      json: true,
    };
    rp.get(options).then((response) => console.log(response.items.map((a)=> a.name))); }
}
module.exports = Query;
 
//.map((a)=> a.name)
// rp.get(options).then((response) => console.log(response.items)); 