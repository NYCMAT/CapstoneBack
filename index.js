const express = require("express");
const app = express();
const cors = require("cors");
//try using pool. 
const pool = require("./db");
const postgres = require('./postgres.js');

//middleware
app.use(express.json()); //req.body
app.use(cors());

//routes

//create a fighter
//Tried using async, try, and catch. Had issues in postman, reverted back to 
// app.post("/fighters", async(req,res) => {
//     try{ 
//         const { name, nickname , country, age , weightclass, record, imgUrl } = req.body;      
//         const newFighter = await pool.query("INSERT INTO fighter (name, nickname, country, age, weightclass, record, imgUrl) VALUES(?, ?, ?, ?, ?, ?, ?) ",
//         [name, nickname, country, age, weightclass,record, imgUrl]
        
//         );

//         res.json(newFighter.rows[0]);
//     }catch(err){
//         console.log(err.message);
//     }
// });

app.post('/fighter', (req, res) => {
    postgres.query(`INSERT INTO fighter (name, nickname, country, age, weightclass, record, imgUrl) VALUES ('${req.body.name}', '${req.body.nickname}', '${req.body.country}', ${req.body.age}, '${req.body.weightclass}', '${req.body.record}', '${req.body.imgUrl}')`, (err, results) => {
        postgres.query('SELECT * FROM fighter ORDER BY fighter_id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});

//get all fighters
app.get('/fighter', (req, res) => {
    postgres.query('SELECT * FROM fighter ORDER BY fighter_id ASC;', (err, results) => {
        res.json(results.rows)
    });
});
//get a fighter
app.get('/fighter/:id', (req, res) => {
    postgres.query('SELECT * FROM fighter WHERE fighter_id =' + req.params.id, (err, results) => {
        res.json(results.rows)
    });
});
//update a fighter
app.put('/fighter/:id', (req, res) => {
    postgres.query(`UPDATE fighter SET name = '${req.body.name}',nickname = '${req.body.nickname}',country = '${req.body.country}', age = ${req.body.age}, weightclass = '${req.body.weightclass}',record = '${req.body.record}',imgUrl = '${req.body.imgUrl}'  WHERE fighter_id = ${req.params.id}`, (err, results) => {
        postgres.query('SELECT * FROM fighter ORDER BY fighter_id ASC;', (err, results) => {
            res.json(results.rows)
        });
    })
});
//delete a fighter
app.delete('/fighter/:id', (req, res) => {
    postgres.query(`DELETE FROM fighter WHERE fighter_id = ${req.params.id};`, (err, results) => {
        postgres.query('SELECT * FROM fighter ORDER BY fighter_id ASC;', (err, results) => {
            res.json(results.rows)
        });
    });
});

postgres.connect();

// app.listen(3000, () => {
//     console.log("server has started on port 3000");
// }); 