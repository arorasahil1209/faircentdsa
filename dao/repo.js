const sequelize= require('sequelize');
let moment = require('moment');
const db = require('../models');
const Users =  db.users; 

const findMaxUid = async()=>{
    let data= await Users.findAll({
        attributes: [[sequelize.fn('max', sequelize.col('uid')), 'uid']],
    })
    return data[0].uid ;
}

const getEpochTimestamp = ()=>{
    let d = new Date();
    let sec = seconds_since_epoch(d);
    return sec;    
}

function seconds_since_epoch(d){ 
    return Math.floor( d / 1000 ); 
}
module.exports ={
    findMaxUid,
    getEpochTimestamp
}