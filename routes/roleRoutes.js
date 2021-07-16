const express = require('express')
const router = express.Router();
const db = require('../db/Connection')


router.get('/roles', (req,res)=> {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err,rows)=> {
        if(err) {
            res.status(500).json({error: err.message})
            return;
        }
        res.json({
            data:rows
        })
    })
})

router.get('/roles/:id', (req,res)=>{
    const sql = `SELECT * FROM role WHERE id=?`
    const params = [req.params.id]
    db.query(sql,params,(err,rows)=> {
        if(err){
            res.status(500).json({error: err.message})
            return;
        }
        res.json({
            data: rows
        })
    })
})
module.exports = router