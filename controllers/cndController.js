const db = require('../models');
const Users =  db.users; 
const centUser = db.centUser;
const centCnd = db.centCnd;

let getStates = async(req,res) =>{
    try{
    console.log('all states')
    let getStateData = await centCnd.findAll({
        where: {"cnd_group":"STATE_INDIA"},
        raw:true
    })
    return res.json({
        data:getStateData,
        message:'SUCCESS',
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


let getCities = async(req,res) =>{
    try{  
    let getCityData = await centCnd.findAll({
        where: {
            "cnd_group":req.query.cityCode
        },
        raw:true
    })
    return res.json({
        data:getCityData,
        message:'SUCCESS',
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


let getReligions = async(req,res) =>{
    try{  
    let getReligionData = await centCnd.findAll({
        where: {
            "cnd_group":"INDIA_RELIGION"
        },
        raw:true
    })
    return res.json({
        data:getReligionData,
        message:'SUCCESS',
        status:200
    })
    }catch(err){
        console.log('error ',err);
        return res.json({
            message:"Error occured religion list",
            error:err
        })
    }
}

let getLoans = async(req,res) =>{
    try{  
    let getLoanData = await centCnd.findAll({
        where: {
            "cnd_group":"INDIA_LOAN"
        },
        raw:true
    })
    return res.json({
        data:getLoanData,
        message:'SUCCESS',
        status:200
    })
    }catch(err){
        console.log('error ',err);
        return res.json({
            message:"Error occured religion list",
            error:err
        })
    }
}

let getEmploymentTypes = async(req,res) =>{
    try{  
    let getEmploymentData = await centCnd.findAll({
        where: {
            "cnd_group":"EMPLOYMENT_TYPE"
        },
        raw:true
    })
    return res.json({
        data:getEmploymentData,
        message:'SUCCESS',
        status:200
    })
    }catch(err){
        console.log('error ',err);
        return res.json({
            message:"Error occured religion list",
            error:err
        })
    }
}


let getBusinessTypes = async(req,res) =>{
    try{  
    let getBuisnessData = await centCnd.findAll({
        where: {
            "cnd_group":"BUSINESS_INDUSTRY"
        },
        raw:true
    })
    return res.json({
        data:getBuisnessData,
        message:'SUCCESS',
        status:200
    })
    }catch(err){
        console.log('error ',err);
        return res.json({
            message:"Error occured religion list",
            error:err
        })
    }
}

let getIndianAssets = async(req,res) =>{
    try{  
    let getBuisnessData = await centCnd.findAll({
        where: {
            "cnd_group":"INDIA_ASSET"
        },
        raw:true
    })
    return res.json({
        data:getBuisnessData,
        message:'SUCCESS',
        status:200
    })
    }catch(err){
        console.log('error ',err);
        return res.json({
            message:"Error occured religion list",
            error:err
        })
    }
}

let getPinCodes = async(req,res) =>{
    try{  
    let getBuisnessData = await centCnd.findAll({
        where: {
            "cnd_parent_id":req.query.parentId,
            "cnd_group":req.query.cndGroup,
        },
        raw:true
    })
    return res.json({
        data:getBuisnessData,
        message:'SUCCESS',
        status:200
    })
    }catch(err){
        console.log('error ',err);
        return res.json({
            message:"Error occured religion list",
            error:err
        })
    }
}

let getAllBanks = async(req,res) =>{
    try{  
    let getBankDetails = await centCnd.findAll({
        where: {
            "cnd_group":"INDIA_BANK_NAME",
            "deleted":"N",
            "is_active":1
        },
        raw:true
    })
    return res.json({
        data:getBankDetails,
        message:'SUCCESS',
        status:200
    })
    }catch(err){
        console.log('error ',err);
        return res.json({
            message:"Error occured banking list",
            error:err
        })
    }
}


let getResidenceType = async(req,res) =>{
    try{  
    let getResidenceTypes = await centCnd.findAll({
        where: {
            "cnd_group":"RESIDENCE_TYPE",
            "deleted":"N",
            "is_active":1
        },
        raw:true
    })
    return res.json({
        data:getResidenceTypes,
        message:'SUCCESS',
        status:200
    })
    }catch(err){
        console.log('error ',err);
        return res.json({
            message:"Error occured banking list",
            error:err
        })
    }
}


module.exports ={
    getStates,
    getCities,
    getReligions,
    getLoans,
    getEmploymentTypes,
    getBusinessTypes,
    getIndianAssets,
    getPinCodes,
    getAllBanks,
    getResidenceType
}