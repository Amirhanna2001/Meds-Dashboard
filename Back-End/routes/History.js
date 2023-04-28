const router = require('express').Router();
const conn = require('../db/connection');

router.get('/:UserId',(req,res)=>{
    conn.query('SELECT * FROM requests WHERE ? ',{UserId:UserId},(error,result,fields)=>{
        res.json(res);
    });
    
});