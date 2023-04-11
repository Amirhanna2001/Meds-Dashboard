const { query } = require("express");
const conn = require("../db/connection");
const util = require("util");

const Authorized = async (req,res,next)=>{
    const query = util.promisify(conn.query).bind(conn);
    const {token} = req.headers;
    const user = await query("SELECT * FROM user WHERE token = ?",[token]);

    if(user[0]){
        res.locals.user = user[0];
        next();
    }
    else{
        res.status(403).json({
            msg:"You Are Not Allowed To Acces This Route Please Login !"
        })
    }

}

module.exports = Authorized;