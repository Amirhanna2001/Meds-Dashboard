const router = require('express').Router();
const adminAuth = require('../middleware/admin');
const conn = require('../db/connection');
const Authorized = require('../middleware/authorize');
const Admin = require('../middleware/admin');
 const { body, validationResult } = require("express-validator");
const util = require("util"); // helper
const bcrypt = require("bcrypt");
const crypto = require("crypto");

router.get('/',(req,res)=>{
    conn.query('SELECT * FROM User',(error,result,fields)=>{
        res.json(result)
    });
});

router.post(
    "/",
    body("email").isEmail().withMessage("please enter a valid email!"),
    body("name")
      .isString()
      .withMessage("please enter a valid name")
      .isLength({ min: 10, max: 20 })
      .withMessage("name should be between (10-20) character"),
    body("password")
      .isLength({ min: 8, max: 12 })
      .withMessage("password should be between (8-12) character"),
      body('phone').isNumeric().isLength({min:11,max:11}).withMessage("Invalid Phone Number"),
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        console.log(req.body.phone);
        if (!errors.isEmpty()) {
          
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF EMAIL EXISTS
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        const user = await query(
          "select * from user where email =? ",
          [req.body.email]
        );
        if (user.length > 0) {
          res.status(400).json({
            errors: [
              {
                msg: "email already exists !",
              },
            ],
          });
        }
        const cuser = await query(
          "select * from user where phone = ?",
          [req.body.phone]
        );
        if (cuser.length > 0) {
          res.status(400).json({
            errors: [
              {
                msg: "phone already exists !",
              },
            ],
          });
        }
        
  
        // 3- PREPARE OBJECT USER TO -> SAVE
        const userData = {
          name: req.body.name,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
          phone:req.body.phone,
          token: crypto.randomBytes(16).toString("hex"), // JSON WEB TOKEN, CRYPTO -> RANDOM ENCRYPTION STANDARD
          
  
        };
  
        // 4- INSERT USER OBJECT INTO DB
        await query("insert into user set ? ", userData);
        delete userData.password;
        res.status(200).json(userData);
      } catch (err) {
        res.status(500).json({ err: err });
      }
    }
  );

router.get("/:id", async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const user = await query("select * from user where id = ?", [
      req.params.id,
    ]);
    if (!user[0]) {
      res.status(404).json({ ms: "user not found !" });
    }
    res.status(200).json(user[0]);
  });

  router.put(
    "/:id", // params
    Admin,
    body("email").isEmail().withMessage("please enter a valid email!"),
    body("name")
      .isString()
      .withMessage("please enter a valid name")
      .isLength({ min: 10, max: 20 })
      .withMessage("name should be between (10-20) character"),
    // body("password")
    //   .isLength({ min: 8, max: 12 })
    //   .withMessage("password should be between (8-12) character"),
      body('phone').isNumeric().isLength({min:11,max:11}).withMessage("Invalid Phone Number"),
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF user EXISTS OR NOT
        const user = await query("select * from user where id = ?", [
          req.params.id,
        ]);
        if (!user[0]) {
          res.status(404).json({ ms: "user not found !" });
        }
  
        // 3- PREPARE user OBJECT
        const userObj = {
          name: req.body.name,
          password:req.body.password,
          email:req.body.email,
          phone:req.body.phone,
          role:req.body.role,
          status:req.body.status
        };
  
        // 4- UPDATE user
        await query("update user set ? where id = ?", [userObj, user[0].ID]);
  
        res.status(200).json({
          msg: "user updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

router.delete('/:id',Admin,async(req,res)=>{
    const {id} = req.params;
    const query = util.promisify(conn.query).bind(conn);
    const users = await query('SELECT * FROM user WHERE ID = ?',[id])

    if (users.length == 0) {
        res.status(404).json({
          errors: [
            {
              msg: "User Not found !",
            },
          ],
        });
         
    }
    await query("Delete From user where ID = ?",[id]);
            
        res.send("Deleted");
}
       

    );
    
    
module.exports = router