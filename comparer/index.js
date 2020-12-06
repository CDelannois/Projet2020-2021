const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db_jeux_societe');
const connection = require('./db_jeux_societe');
const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}));

const port = 3000;

function query(request, data) {
    return new Promise((resolve, reject) => {
        db.query(request, (data || []), (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

app.get("/jeux", async (req, res) => {
    try {
        const jeux = await query('select * from jeux');
        res.json(jeux);
    } catch (e) {
        return res.status(400).json({
            error: 'Les jeux ne sont pas disponibles!'
        })
    }
});

app.get("/jeux/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const jeux = await query('select * from jeux where id_jeux=?', [id]);
        if (jeux.lenght === 0) {
            return res.status(404).json({
                error: "Ce jeu n'existe pas!"
            });
        } else {
            res.json(jeux)
        }
    } catch (e) {
        return res.status(400).json({
            error: 'Les jeux ne sont pas accessibles!'
        });
    }
});


app.post('/jeux', async (req, res) => {
    const data = req.body;
    try {
        const add = await query('INSERT INTO `jeux_de_societe`.`jeux` (id_jeux, titre, joueurs_min, joueurs_max, duree, age_recommande, theme, date_parution, appartient) VALUES (NULL,?,?,?,?,?,?,?,?)', [data.titre, data.joueurs_min,data.joueurs_max, data.duree, data.age_recommande, data.theme, data.date_parution, data.appartient]);
        return res.status(200).json({
            ok: 'Félicitations pour le nouveau jeu!'
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Une erreur est survenue!'
        });
    }
});

app.listen(port, () => {
    console.log(`server started :${port}`);
});