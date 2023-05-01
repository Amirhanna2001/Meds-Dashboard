const router = require('express').Router();
const conn = require('../db/connection');
const Authorized = require('../middleware/authorize');

// router.get('/',Authorized,(req,res)=>{
//     conn.query('SELECT * FROM requests WHERE ? ',{UserId:id},(error,result,fields)=>{
//         res.json(res);
//     });
    
// });