let axios = require('axios');

let httpReqequest = async (config)=>{
    try{
        let response = await axios({
            method:config.method,
            url:config.url,
            data:config.data,
            headers:{
                'x-application-id':'b6419f1a493a09e21aae9de583f0d9dd',
                'x-application-name':'FAIRCENT',
                'content-type':'application/json'
            }
            
        })
        return response.data;
    }catch(error){
        return error
    }
}

module.exports ={
httpReqequest
}