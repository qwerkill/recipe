const mysql = require('mysql')
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
var cors = require('cors')

app.use(cors())
app.use(express.json())

const con = mysql.createConnection({
    host : "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

con.connect(function(err) {
    if (err) throw err;
})

function findOne(id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM recipe WHERE id = ${id}`, function (err, result, fields) {
            if (err) reject(err)
            resolve(result[0])
        })
    })
}

app.get('/recipes', (req, res) => {
    // envoyer la liste des recettes SELECT
    const sql = "SELECT * FROM recipe";
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/recipes/:id', async (req, res) => {
    const result = await findOne(req.params.id)
    res.send(result)
})

app.post('/recipes', (req, res) => {
    // créer une recette
    const recipe = req.body;
    const category = recipe.category === undefined ? "" : recipe.category;
    const sql = `INSERT INTO recipe (title, category) VALUES ('${recipe.title}','${category}')`;
    con.query(sql, [recipe.title] , async (err, result) => {
        if (err) throw err;
        
        const recipe = await findOne(result.insertId)
        res.send(recipe)
    });
})

app.put('/recipes/:id', (req, res) => {
    const id = req.params.id;
    const recipe = req.body;
    const sql = "UPDATE recipe SET title = ?, category = ? WHERE id = ?";
    con.query(sql, [recipe.title,recipe.category, id] , async (err, result) => {
        if (err) throw err;
        
        const recipe = await findOne(req.params.id)
        res.send(recipe)
    })
})

app.delete('/recipes/:id', (req, res) => {
    // supprimer une recette
    const sql = "DELETE FROM recipe WHERE id = ?";
    con.query(sql, [req.params.id] ,function (err, result) {
        if (err) throw err;
        res.sendStatus(200);
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})