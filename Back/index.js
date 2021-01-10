const express = require("express");
const bodyParser = require("body-parser");
//Parse les requêtes de body entrantes dans un middleware avant les handlers. Utiliser les propriétés de req.body.
const cors = require('cors');
//Cross-origin resource sharing (CORS) permet d'autoriser les ressources sur une page web provenant de requêtes depuis un autre domaine hors du domaine d'origine.
const db = require("./db_jeux");
//Connection à la bdd

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true //This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true). Certaines données seront au format date.
}));

app.use(cors());

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

//______________________________________________________________________________Partie jeux____________________________________________________________________________________________

// Récupération de tous les jeux
app.get("/jeux", async (req, res) => {
    try {
        const jeux = await query("SELECT * FROM jeux");
        res.json(jeux);
    } catch (e) {
        return res.status(400).json({
            error: "Les jeux ne sont pas disponibles!"
        });
    }
});

//Récupération d'un jeu dont on spécifie l'ID
app.get("/jeux/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const jeux = await query("SELECT * FROM jeux WHERE id_jeux=?", [id]);
        if (jeux.lenght === 0) {
            return res.status(404).json({
                error: "Ce jeu n'existe pas!"
            });
        } else {
            res.json(jeux)
        }
    } catch (e) {
        return res.status(400).json({
            error: "Les jeux ne sont pas accessibles! " + e
        });
    }
});

//Ajout d'un jeu
app.post("/jeux", async (req, res) => {
    const data = req.body;
    try {
        const add = await query("INSERT INTO jeux (id_jeux, titre, joueurs_min, joueurs_max, duree, age_recommande, mecanisme, mecanisme2, date_parution, editeur, commentaire, appartient) VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?)", [data.titre, data.joueurs_min, data.joueurs_max, data.duree, data.age_recommande, data.mecanisme, data.mecanisme2, data.date_parution, data.editeur, data.commentaire, data.appartient]);
        return res.status(200).json({
            ok: "Félicitations pour le nouveau jeu!"
        });
    } catch (e) {
        return res.status(400).json({
            error: "Une erreur est survenue! " + e
        });
    }
});

//Editer un jeu
app.post("/jeux/:id", async (req, res) => {
    const id = req.params.id;

    //Récupérer les infos du jeux
    const {
        titre,
        joueurs_min,
        joueurs_max,
        duree,
        age_recommande,
        mecanisme,
        mecanisme2,
        date_parution,
        editeur,
        commentaire,
        appartient
    } = req.body;
    try {
        const edit = await query("SELECT * FROM jeux WHERE id_jeux=?", [id]);
        if (edit.length === 0) {
            return res.status(404).json({
                error: "Ce jeu n'existe pas."
            });
        }
        const jeu = edit[0];
        jeu.id_jeux;
        jeu.titre = titre;
        jeu.joueurs_min = joueurs_min;
        jeu.joueurs_max = joueurs_max;
        jeu.duree = duree;
        jeu.age_recommande = age_recommande;
        jeu.mecanisme = mecanisme;
        jeu.mecanisme2 = mecanisme2;
        jeu.date_parution = date_parution;
        jeu.editeur = editeur;
        jeu.commentaire = commentaire;
        jeu.appartient = appartient;

        //Mise à jour du jeu
        const add = await query("UPDATE jeux SET titre = ?, joueurs_min = ?, joueurs_max = ?, duree = ?, age_recommande = ?, mecanisme = ?, mecanisme2 = ?, date_parution = ?, editeur = ?, commentaire = ?, appartient = ? WHERE id_jeux = ?", [jeu.titre, jeu.joueurs_min, jeu.joueurs_max, jeu.duree, jeu.age_recommande, jeu.mecanisme, jeu.mecanisme2, jeu.date_parution, jeu.editeur, jeu.commentaire, jeu.appartient, jeu.id_jeux]);
        res.json(jeu);
    } catch (e) {
        return res.status(400).json({
            error: "Une erreur est survenue! " + e
        });
    }

});

//Suppression d'un jeu
app.delete("/jeux/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const del = await query("DELETE FROM jeux WHERE id_jeux =?", [id]);
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
            error: e
        })
    }
});

//______________________________________________________________________________Partie membres____________________________________________________________________________________________

// Récupération de tous les membres
app.get("/membre", async (req, res) => {
    try {
        const membre = await query("SELECT * FROM membre");
        res.json(membre);
    } catch (e) {
        return res.status(400).json({
            error: "Les membres ne sont pas disponibles!"
        });
    }
});

//Récupération d'un membre dont on spécifie l'ID
app.get("/membre/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const membre = await query("SELECT * FROM membre WHERE id_membre=?", [id]);
        if (membre.lenght === 0) {
            return res.status(404).json({
                error: "Cette personne n'existe pas!"
            });
        } else {
            res.json(membre)
        }
    } catch (e) {
        return res.status(400).json({
            error: "Les membres ne sont pas accessibles! " + e
        });
    }
});

//Ajout d'un membre
app.post("/membre", async (req, res) => {
    const data = req.body;
    try {
        const add = await query("INSERT INTO membre (id_membre, nom, prenom, telephone, email, adresse, date_naissance) VALUES (NULL,?,?,?,?,?,?)", [data.nom, data.prenom, data.telephone, data.email, data.adresse, data.date_naissance]);
        return res.status(200).json({
            ok: "Nouveau membre inscrit!"
        });
    } catch (e) {
        return res.status(400).json({
            error: "Une erreur est survenue! " + e
        });
    }
});

//Editer un membre
app.post("/membre/:id", async (req, res) => {
    const id = req.params.id;

    //Récupérer les infos du membre
    const {
        nom,
        prenom,
        telephone,
        email,
        adresse,
        date_naissance
    } = req.body;
    try {
        const edit = await query("SELECT * FROM membre WHERE id_membre=?", [id]);
        if (edit.length === 0) {
            return res.status(404).json({
                error: "Cette personne n'existe pas."
            });
        }
        //Mise à jour du membre

        const membre = edit[0];
        membre.id_membre;
        membre.nom = nom;
        membre.prenom = prenom;
        membre.telephone = telephone;
        membre.email = email;
        membre.adresse = adresse;
        membre.date_naissance = date_naissance;
        const add = await query("UPDATE membre SET nom = ?, prenom = ?, telephone = ?, email = ?, adresse = ?, date_naissance = ? WHERE id_membre = ?", [membre.nom, membre.prenom, membre.telephone, membre.email, membre.adresse, membre.date_naissance, membre.id_membre]);
        res.json(membre);
    } catch (e) {
        return res.status(400).json({
            error: "Une erreur est survenue! " + e
        });
    }
});

//Suppression d'un jeu
app.delete("/membre/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const del = await query("DELETE FROM membre WHERE id_membre =?", [id]);
        if (del.affectedRows == 0) {
            return res.status(404).json({
                error: "Cette personne n'existe pas."
            });
        } else {
            return res.status(200).json({
                ok: "Le membre a bien été supprimé."
            })
        }
    } catch (e) {
        return res.status(400).json({
            error: e
        })
    }
});


//______________________________________________________________________________Partie jointure____________________________________________________________________________________________

// Récupération de tous les membres et de leurs jeux
app.get("/membre_jeux", async (req, res) => {
    try {
        const membre_jeux = await query("SELECT * FROM membre JOIN jeux ON id_membre=appartient");
        res.json(membre_jeux);
    } catch (e) {
        return res.status(400).json({
            error: "Une erreur est survenue!"
        });
    }
});

//Récupération des jeux d'un membre dont on spécifie l'ID
app.get("/membre_jeux/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const membre_jeux = await query("SELECT * FROM membre JOIN jeux ON id_membre=appartient where id_membre=? ", [id]);
        if (membre_jeux.lenght === 0) {
            return res.status(404).json({
                error: "Cette personne n'existe pas!"
            });
        } else {
            res.json(membre_jeux)
        }
    } catch (e) {
        return res.status(400).json({
            error: "Une erreur est survenue. " + e
        });
    }
});

//Démarre le serveur + indique le port spécifié.
app.listen(port, () => {
    console.log(`Server started :${port}`);
});