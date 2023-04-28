const router = require("express").Router();
const conn = require("../db/connection");
const authorized = require("../middleware/authorize");
const Admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImage");
const util = require("util"); // helper
const fs = require("fs"); // file system


router.get('/',(req,res)=>{
    conn.query('SELECT * FROM medicines',(error,result,fields)=>{
        res.json(result)
    });
});

router.get('/:id',async (req,res)=>{
    const query = util.promisify(conn.query).bind(conn);

    const cat = await query('SELECT * FROM category WHERE Id = ?',[req.params.id]);
    if(!cat[0])
        res.status(404).json({msg:'No Categories With this ID'});

    const meds =await query('SELECT * FROM medicines WHERE CategoryId = ?',[req.params.id]);
    console.log(cat[0].id);

    res.status(200).json(meds);
});
//LocalHost400:Medicine/Create
router.post('/Create',
    Admin,
    upload.single("Image"),
    body('name').isString().withMessage("Please Enter a Valid Name !"),
    body('description').isLength({min:10}).withMessage('Description At Least 10 chars'),
    body('price').isNumeric({min:1}).withMessage('Price Is Numiric Only '),
    body('ExpireDate').isDate().withMessage('Enter Valid Date'),
    body('categoryid').isNumeric().withMessage('Category Id is Number'),

    async (req,res)=>{
        try{
        const errors = validationResult(req);

        if(!errors.isEmpty)
            res.status(500).json(errors);

        if(!req.file)
            res.status(500).json({errors:[{
                msg:'Image Is Required'
            }]});
        const query = util.promisify(conn.query).bind(conn);
        const medicin =await query('SELECT * FROM medicines WHERE  Name = ?',[req.body.name]);
        if(medicin[0])
            res.status(500).json({msg:"This Name Is Already Exsits !"});
        const cat =await query('SELECT * FROM category WHERE Id =?',[req.body.CategoryId]);
        if(!cat[0])
            res.status(500).json({msg:'This Category Not Found '});
        
        const medicinToInsert ={
            Name:req.body.Name,
            description:req.body.Description,
            price : req.body.Price,
            ExpireDate:req.body.ExpireDate,
            CategoryId:req.body.CategoryId,
            image_url:req.file.filename

        } 
        await query('INSERT INTO medicines SET ?',medicinToInsert);
    }
    catch(ex){
        res.status(500).json(ex);
    }
});

router.get('/GetMedicine/:id',async (req,res)=>{
    const query = util.promisify(conn.query).bind(conn);
    const medicine =await query('SELECT * FROM medicines WHERE Id = ?',[req.params.id]); 
    
        if(!medicine[0])
             res.status(404).json("Medicine Not Found !");
        res.status(200).json(medicine);
    });

router.put('/Edit/:id',
        upload.single("Image"),
        body('Name').isString().withMessage("Please Enter a Valid Name !"),
        body('Description').isLength({min:10}).withMessage('Description At Least 10 chars'),
        body('Price').isNumeric({min:1}).withMessage('Price Is Numiric Only '),
        body('ExpireDate').isDate().withMessage('Enter Valid Date'),
        body('CategoryId').isNumeric().withMessage('Category Id is Number'),

        async (req,res)=>{
            try{
            const errors = validationResult(req);

            if(!errors.isEmpty)
                res.status(500).json(errors);

            const query = util.promisify(conn.query).bind(conn);
            const medicine =await query('SELECT * FROM medicines WHERE Id =?',[req.params.id]);
            console.log(req.params.id);
            if(!medicine[0])
                res.status(500).json({msg:'No Medicine With This ID'});
            
            const medicinToInsert ={
                Name:req.body.Name,
                description:req.body.Description,
                price : req.body.Price,
                ExpireDate:req.body.ExpireDate,
                CategoryId:req.body.CategoryId,

            } 
            if (req.file) {
                medicinToInsert.image_url = req.file.filename;
                fs.unlinkSync("./upload/" + med[0].image_url); // delete old image
              }
             await query('UPDATE medicines SET ? WHERE Id = ?',[medicinToInsert,req.params.id]);

            res.status(200).json({msg:"Medicine Updated !"});
        }
        catch(ex){
            //console.log(ex);
            res.status(500).json(ex);
}});

router.delete('/Delete/:id',async(req,res)=>{
    const query = util.promisify(conn.query).bind(conn);
    const medicine =await query('SELECT * FROM medicines WHERE Id = ?',[req.params.id]);
    if(!medicine[0])
        res.status(404).json({msg:'No Medicine With This ID'});
    
        await query('DELETE  FROM medicines WHERE Id = ?',req.params.id);
    res.json({msg:'Deleted '});
});

module.exports = router