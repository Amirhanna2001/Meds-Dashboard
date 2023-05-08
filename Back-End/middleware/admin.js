const { query } = require("express");
const conn = require("../db/connection");
const util = require("util");

const Admin = async (req,res,next)=>{
    const query = util.promisify(conn.query).bind(conn);
    const {token} = req.headers;
    const user = await query("SELECT * FROM user WHERE token = ?",[token]);
    console.log();
    if(user[0] && user[0].role == '1')
        next();
    else
        res.status(403).json({
            msg:"You Are Not Allowed To Acces This Route!"
        });
    

}

module.exports = Admin; 