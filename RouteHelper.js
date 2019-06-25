function routehelper(callback){
  
    return async (req, res) => {
      try{
        await callback(req, res);
      }catch(error){
        if(error.cod === 333){ res.status(404).send({status: 404, errorCode: 'RELATED_RESOURCE_NOT_FOUND'});}
        if(error.cod === 404){ res.status(404).send({status: 404, errorCode: 'RESOURCE_NOT_FOUND'});}
        if(error.cod === 409){ res.status(409).send({ status: 409, errorCode: 'RESOURCE_ALREADY_EXISTS'});}
        
    }
    }
  
  }

  module.exports = routehelper;