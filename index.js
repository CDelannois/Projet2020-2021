const express = require('express');
const bodyParser = require('body-parser');
//Parse les requêtes de body entrantes dans un middleware avant les handlers. Utiliser les propriétés de req.body.
//const cors = require('cors');
//Cross-origin resource sharing (CORS) permet d'autoriser les ressources sur une page web provenant de requêtes depuis un autre domaine hors du domaine d'origine.
const db = require('./db_jeux');
//Connection à la bdd

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true //This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true). Certaines données seront au format date.
}));

//app.use(cors());

//Déclaration d'une promesse pour la réalisation des requêtes SQL
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

// Récupération de tous les jeux
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

//Récupération d'un jeu dont on spécifie l'ID
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

//Ajout d'un jeu
app.post('/jeux', async (req, res) => {
    const data = req.body;
    try {
        const add = await query('INSERT INTO `jeux_de_societe`.`jeux` (id_jeux, titre, joueurs_min, joueurs_max, duree, age_recommande, mecanisme, mecanisme2, date_parution, editeur, commentaire, appartient) VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?)', [data.titre, data.joueurs_min, data.joueurs_max, data.duree, data.age_recommande, data.mecanisme, data.mecanisme2, data.date_parution, data.editeur, data.commentaire, data.appartient]);
        return res.status(200).json({
            ok: 'Félicitations pour le nouveau jeu!'
        });
    } catch (e) {
        return res.status(400).json({
            error: 'Une erreur est survenue!'
        });
    }
});

//Suppression d'un jeu
app.delete("/jeux/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const del = await query('DELETE FROM jeux_de_societe where id_jeux =?', [id]);
        if (del.affectedRows == 0) {
            return res.status(404).json({
                error: "Ce jeu n'existe pas."
            });
        } else {
            return res.status(200).json({
                ok: "Le jeu a bien été supprimé."
            })
        }
    } catch (e) {
        return res.status(400).json({
            error: "Prout prout que je t'aime!."
        })
    }
});



//Démarre le serveur + indique le port spécifié.
app.listen(port, () => {
    console.log(`Server started :${port}`);
});