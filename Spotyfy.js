/* eslint-disable indent */
/* eslint-disable linebreak-style */

const rp = require('request-promise');




class Spotyfy{

  constructor(){
    this.token = 'BQAFRgZgjem1rYfLsXH45hSQs9CBXazxGw2v2GCLVrjgm4XYYoU2stJEIAkNDwHX-tWbERIjGxQni-KYKvLS7uXczWkRYNKd3tPjXbSdd66S4kYSGx0-khy8ihV28cqcRf5Ncq8ECkfk17csg77VBWCilhH2G0B4BOxMlcKHHTpsxxiss7wb';
    
  }
  queryAlbumsArtist(artist){
    
    const options = {
      url: 'https://api.spotify.com/v1/search',
      qs: { q : artist.name,
        type: 'artist'},
      headers: { Authorization: 'Bearer ' + this.token },
      json: true,
    };

    rp.get(options)
      .then((response) => this.queryAlbumsForId(response.artists.items[0].id,artist))
      .catch((error) => {throw (error);}); 
      
  }
                
  queryAlbumsForId(id, artist){
    const options = {  
      url: 'https://api.spotify.com/v1/artists/'+id+'/albums?',
      qs: { type: 'album'},
      headers: { Authorization: 'Bearer ' + this.token },
      json: true,
    };
    rp.get(options).then((response) => {artist.addAlbumsConsultaSpotify(response.items);
      console.log(artist);
      console.log(artist.albums);
    })
    .catch((error) => {throw (error);}); 
}
}
module.exports = Spotyfy;

//; console.log(response.items)
//.map((a)=> a.name)
// rp.get(options).then((response) => console.log(response.items)); 
//this.queryIdArtist(response.artists.items.find((Ar)=> Ar.name.toLowerCase() === artistName.toLowerCase()).id)