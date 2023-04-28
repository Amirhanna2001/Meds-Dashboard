const router = require('express').Router();
const adminAuth = require('../middleware/admin');
const conn = require('../db/connection');
const Authorized = require('../middleware/authorize');
const Admin = require('../middleware/admin');

router.get('/',(req,res)=>{
    conn.query('SELECT * FROM User',(error,result,fields)=>{
        res.json(result)
    });
});

router.post('/CreateUser',Admin,(req,res)=>{
    data = req.body;
    conn.query(
        'INSERT INTO users set ? ',
        {
            email : data.email,
            password :data.password,
            phone:data.phone,
            status:data.status,
            type:data.type,
            name:data.name,

        },(error,result,fields)=>{
           if(error)
               res.send("Error Please Try Again",error.stack);

            res.send("User Added Successfully") ;

        })

});

router.get('/GetUser/:id',Admin,(req,res)=>{
    const {id} = req.params;
    conn.query('SELECT * FROM users WHERE ?',{id:id},(error,result,fields)=>{
        if(error) res.send("An Error Happend ");
        if(result[0])
              res.json(result[0]);
        res.statusCode = 404;
        res.send("User Not Found !")
    })

});

router.put('/EditUser/:id',Admin,(req,res)=>{
    const {id} = req.params;
    const data = req.body; 
    conn.query('UPDATE users SET ? WHERE ?',
    [{email : data.email,
        password :data.password,
        phone:data.phone,
        status:data.status,
        type:data.type,
        name:data.name,},
        {id:id}],
        (error,result,fields)=>{
            if(error)
                res.send("An Error Happend !");
            res.send("User Updated ");
        })

});

router.delete('/DeleteUser/:id',Admin,(req,res)=>{
    const {id} = req.params;
    conn.query('DELETE FROM users WHERE ?',{id:id},(error,result,fields)=>{
        if(error){
            res.statusCode = 500;
            res.send("error happend");
        }

        if(result.affectedRows == 0){
            res.statusCode = 404;
            res.send("User Not Found !");
        }
            
        res.send("Deleted");
    })

});

module.exports = router