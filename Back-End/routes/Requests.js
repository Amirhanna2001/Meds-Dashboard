const router = require('express').Router();
const conn = require('../db/connection');
const Admin = require('../middleware/admin');
const adminAuth = require('../middleware/admin');
const Authorized = require('../middleware/authorize');
const util = require("util"); // helper
//Request_Status (0=>Painding, 1=> Accepted , 2=> Refused)
router.get("/", Admin, async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const requests = await query("SELECT * FROM requests");

    res.status(200).json(requests);
})

router.get('/:id', async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const user = await query("SELECT * FROM user where id = ? ", [req.params.id])
    if (!user[0])
        res.status(404).json({ msg: "No User With ID = " + req.params.id })

    const requ = await query('SELECT * FROM requests WHERE user_id = ?', [req.params.id]);

    res.status(200).json(requ);
});
//Requests
router.post('/NewRequest', Authorized, async (req, res) => {
    try {
        // let medicine_id = req.params.med_id
        let id = req.body.id; 
        const request = {
            user_id: res.locals.user.ID,
            medicine_id:id
        }
        const query = util.promisify(conn.query).bind(conn);

        const requ = await query('INSERT INTO  requests SET  ?', [request]);

        res.status(200).json({msg:"Request Added"});
    }
    catch (err) {
        res.status(500).json(err.message);
    }

});

// router.get('//:id',Authorized,(req,res)=>{
//     const {id} = req.params;
//     conn.query('SELECT * FROM requests WHERE ?',{id:id},(error,result,fields)=>{
//         if(error) {
//             res.statusCode = 500;
//             res.send("An Error Happend ");
//         }
//         if(result[0])
//               res.json(result[0]);
//         res.statusCode = 404;
//         res.send("Request Not Found !")
//     })

// });

router.put('/Accept/:id', async (req, res) => {
    const { id } = req.params;
    const query = util.promisify(conn.query).bind(conn);
    const requ = await query("SELECT * FROM requests WHERE id = ?", [id]);

    if (!requ)
        res.status(404).json({ msg: "No Requests With ID = " + id });

    await query("UPDATE requests SET request_status = 1 WHERE id = ?", [id]);
    res.status(200).json({ msg: "Request Accepted" });
});


router.put('/Refuse/:id',  async (req, res) => {
    const { id } = req.params;
    const query = util.promisify(conn.query).bind(conn);
    const requ = await query("SELECT * FROM requests WHERE id = ?", [id]);

    if (!requ)
        res.status(404).json({ msg: "No Requests With ID = " + id });

    await query("UPDATE requests SET request_status = 2 WHERE id = ?", [id]);
    res.status(200).json({ msg: "Request Refused" });
});

router.delete('/:id', Authorized, async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    const reque = await query("SELECT * FROM requests where ID = ?", [req.params.id]);
    if (!reque[0])
        res.status(404).json({ msg: "No Requests Found With This ID" })

    await query("DELETE FROM requests WHERE ID = ?", [reque[0].ID])
    res.status(200).json({ msg: "Deleted " })
})

router.get('/History/:id', async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    // const hist = await query('SELECT * FROM history WHERE user_id = ? ',[res.locals.user.ID])
    //conn.query('SELECT * FROM requests WHERE  user_id = ?',{user_id:res.locals.user.ID},(error,result,fields)=>{
    //     res.json(res);
    // });
    const user = await query("select * from user where id = ?", [req.params.id]);
    if (!user[0])
        res.status(404).json({ msg: "No User With ID = " + req.params.id })
    hist = await query("SELECT * FROM history where user_id = ?", [req.params.id]);
    res.status(200).json(hist);
});

router.delete('/DeleteHistory/:id', Authorized, async (req, res) => {
    const query = util.promisify(conn.query).bind(conn);
    // const hist = await query('SELECT * FROM history WHERE user_id = ? ',[res.locals.user.ID])
    //conn.query('SELECT * FROM requests WHERE  user_id = ?',{user_id:res.locals.user.ID},(error,result,fields)=>{
    //     res.json(res);
    // });
    hist = await query("delete from history where id = ?", [req.params.id]);
    res.status(200).json({ msg: "Deleted" });
});
module.exports = router