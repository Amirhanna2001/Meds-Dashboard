const router = require('express').Router();
const conn = require('../db/connection');
const Admin = require('../middleware/admin');
const adminAuth = require('../middleware/admin');
const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
//ERRORS :: update & delete not affected in DataBase
router.get('/',(req,res)=>{
    conn.query('SELECT * FROM category',(error,result,fields)=>{
        res.json(result)
    });
});

router.post('/',Admin,
body('name').isString()
.withMessage('Enter Invalid Name')
.isLength({min:5}).withMessage('enter name at least 5 letters'),
body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at lease 20 characters"),
async (req,res)=>{
    try{
        const isValid = validationResult(req);
        if(!isValid.isEmpty)
            return res.status(500).json({errors:isValid.array()});

        const query = util.promisify(conn.query).bind(conn);    
        const ExsitsCategory = query("SELECT * FROM category WHERE Name = ?",[req.body.Name]);

        if(ExsitsCategory[0])
            res.status(500).json({msg:"This Category Is Already Exsists"});

        const cat = {
            name:req.body.name,
            description:req.body.description
        }
        
        await query("insert into category set ? ", cat);
        res.status(200).json({
            msg: "Category created successfully !",
        });
        
    }catch(err){
         res.status(500).json(err);
    }
       
}
);

router.get('/:id',async (req,res)=>{
    const query = util.promisify(conn.query).bind(conn);
    const cat =await query("SELECT * FROM category where id =? ",[req.params.id]);    
        if(!cat[0])
            res.status(404).json({msg:"No Category Found"});

        res.json(cat);
    });

    router.put('/:id',Admin,body('name').isString()
    .withMessage('Enter valid Name')
    .isLength({min:5}).withMessage('enter name at least 5 letters'),
    body("description")
        .isString()
        .withMessage("please enter a valid description ")
        .isLength({ min: 20 })
        .withMessage("description name should be at lease 20 characters"),
    
    async (req,res)=>{
        try{
            const query = util.promisify(conn.query).bind(conn);
            const isValid = validationResult(req);
            if(!isValid.isEmpty)
                return res.status(500).json({errors:isValid.array()});

            const cat =await query('SELECT * FROM category WHERE Id = ?',req.params.id);
            if(!cat[0])
                res.status(404).json({msg:'No Category with this ID'});

            const catToInsert = {
                Id:cat[0].id,
                name:req.body.name,
                description:req.body.description
            }
            console.log(catToInsert);
            await query("update category set ? where Id = ?",[catToInsert,cat[0].Id]);//Not Updated In DataBase
            res.status(200).json({
                msg: "Category Updated successfully !",
            });
            
        }catch(err){
            res.status(500).json(err);
        }
        
    }
);
router.delete('/:id',Admin,async(req,res)=>{
    try{
        const query = util.promisify(conn.query).bind(conn);
        const cat = await query("select * from category where id = ?", [
            req.params.id,
        ]);
        if(!cat[0])
           res.status(404).json({msg:"No Category Found With This Id"});

        await query("delete from category where id = ?",[cat[0].Id]);
        res.status(200).json({msg:"Deleted"});
    }
    catch(err){
        res.status(500).json(err);
    }
});
module.exports = router