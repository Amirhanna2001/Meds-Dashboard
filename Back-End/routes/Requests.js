const router = require('express').Router();
const conn = require('../db/connection');
const adminAuth = require('../middleware/admin');

router.get('/',(req,res)=>{
    conn.query('SELECT * FROM requests ',(error,result,fields)=>{
        res.json(result)
    });
});

router.post('/CreateRequest',(req,res)=>{
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

router.get('/GetRequest/:id',(req,res)=>{
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

router.put('/EditRequest/:id',(req,res)=>{
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

router.delete('/RefuseRequest/:id',adminAuth,(req,res)=>{
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
module.exports = router