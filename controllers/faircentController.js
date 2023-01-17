let {httpReqequest} = require('../services/faircent.services');
let Config =require('../config/dev.json');
let verifyPan = async(req,res)=>{
    try{
        console.log('here')
        if(!req.body.pan){
            return res.json({
                message:"PAN number is mandatory"
            })
        }
        let config ={
            method:'post',
            url:Config.faircentApi.url +'/karza/pancheck',
            data:{
                "pan": req.body.pan,
                "consent": "y"
            }
        }
    let verifyPan = await httpReqequest(config)
    console.log('verifyPan:::',verifyPan)
    return res.json({
        message:'Pan verificaiton details',
        data:verifyPan.result.data,
        status:200
    })
}catch(err){
        console.log('error::',err);
        return res.json({
            message:"Error occured",
            error:err
        })
}
}

module.exports={
    verifyPan
}