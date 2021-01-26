const express = require("express");
//Parse les requêtes de body entrantes dans un middleware avant les handlers. Utiliser les propriétés de req.body.
const bodyParser = require("body-parser");
//Cross-origin resource sharing (CORS) permet d'autoriser les ressources sur une page web provenant de requêtes depuis un autre domaine hors du domaine d'origine.
const cors = require('cors');
const queryPromise=require('./queryPromise')

const app = express();
const port = 3000;

//Middleware
app.use(bodyParser.urlencoded({
    extended: true //This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true). Certaines données seront au format date.
}));
app.use(cors());

//Controllers
const membre= require('./controllers/membre');
const jeux= require('./controllers/jeux');

membre(app, queryPromise);
jeux(app,queryPromise);

//______________________________________________________________________________Partie jointure______________________________________________________________________________________________


//Récupération des jeux d'un membre dont on spécifie l'ID
app.get("/membre_jeux/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const membre_jeux = await queryPromise("SELECT * FROM membre JOIN jeux ON id_membre=appartient where id_membre=? ", [id]);
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

//______________________________________________________________________________Partie lancer l'app__________________________________________________________________________________________

//Démarre le serveur + indique le port spécifié.
app.listen(port, () => {
    console.log(`Server started :${port}`);
});