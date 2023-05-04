const router = require('express').Router();
const conn = require('../db/connection');
const Admin = require('../middleware/admin');
const adminAuth = require('../middleware/admin');
const Authorized = require('../middleware/authorize');
const util = require("util"); // helper


router.get('/',(req,res)=>{
    conn.query('SELECT * FROM requests ',(error,result,fields)=>{
        res.json(result)
    });
});

router.post('/',Authorized,(req,res)=>{
    data = req.body;
    conn.query(
        'INSERT INTO requests  set ? ',
        {
            UserId:         data.UserId,
            medicine_id:    data.medicine_id,
            request_status: 2

        },(error,result,fields)=>{
           if(error)
               res.send("Error Please Try Again",error.stack);

            res.send("Request  Added Successfully") ;

        })

});

router.get('/GetRequest/:id',Authorized,(req,res)=>{
    const {id} = req.params;
    conn.query('SELECT * FROM requests WHERE ?',{id:id},(error,result,fields)=>{
        if(error) {
            res.statusCode = 500;
            res.send("An Error Happend ");
        }
        if(result[0])
              res.json(result[0]);
        res.statusCode = 404;
        res.send("Request Not Found !")
    })

});

router.put('/EditRequest/:id',Admin,(req,res)=>{
    const {id} = req.params;
    const data = req.body; 
    conn.query('UPDATE requests SET ? WHERE ?',
    [{
        UserId:         data.UserId,
        medicine_id:    data.medicine_id,
        request_status: data.request_status
    },
        {id:id}
    ],
        (error,result,fields)=>{
            if(error){
                res.statusCode = 500;
                res.send("An Error Happend !");
            }
            if(result.affectedRows != 0)    
                res.send("Request Updated ");

            res.statusCode = 404;
            res.send("Request Not Found !");
        })

});

router.delete('/RefuseRequest/:id',Admin,(req,res)=>{
    const {id} = req.params;
    conn.query('UPDATE FROM requests WHERE ? SET ?',[{id:id},{request_status : 2}],
    (error,result,fields)=>{
        if(error){
            res.statusCode = 500;
            res.send("error happend");
        }

        if(result.affectedRows == 0){
            res.statusCode = 404;
            res.send("Request Not Found !");
        }
            
        res.send("Refused");
    })

}); 
router.get('/History',Authorized,async(req,res)=>{
    const query = util.promisify(conn.query).bind(conn);
    console.log(res.locals.user);
    const hist = await query('SELECT * FROM history WHERE user_id = ? ',[res.locals.user.ID])
    //conn.query('SELECT * FROM requests WHERE  user_id = ?',{user_id:res.locals.user.ID},(error,result,fields)=>{
    //     res.json(res);
    // });
    res.status(200).json(hist);
});
module.exports = router