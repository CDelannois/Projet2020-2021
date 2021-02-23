const { default: validator } = require("validator");
const jeux = {};

module.exports = (app, queryPromise) => {
    // Récupération de tous les jeux
    app.get("/jeux", async (req, res) => {
        try {
            const jeux = await queryPromise("SELECT * FROM jeux");
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
            const jeux = await queryPromise("SELECT * FROM jeux JOIN jeu on id_jeu = appartient WHERE id_jeux=?", [id]);
            if (jeux.length === 0) {
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

    jeux.validation = (req) => {
        const jeu = req.body;

        const titre = jeu.titre;
        let validateTitre;
        const joueursMin = jeu.joueurs_min;
        let validateJoueursMin;
        const joueursMax = jeu.joueurs_max;
        let validateJoueursMax;
        const duree = jeu.duree;
        let validateDuree;
        const ageRecommande = jeu.age_recommande;
        let validateAgeRecommande;
        const mecanisme = jeu.mecanisme;
        let validateMecanisme;
        const mecanisme2 = jeu.mecanisme2;
        let validateMecanisme2;
        const dateParution = jeu.date_parution;
        let validateDateParution;
        const editeur = jeu.editeur;
        let validateEditeur;
        const commentaire = jeu.commentaire;
        let validateCommentaire;
        const appartient = jeu.appartient;
        let validateAppartient; 
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); //Permet de récupérer la date du jour au format date.
        
        if (validator.isAlpha(nom, "fr-FR", { ignore: " -" }) && validator.isLength(nom, { min: 2, max: 45 })) {
            validateNom = true;
        } else {
            console.log("Le nom ne doit comporter que des lettres, espaces ou traits d'union et doit faire entre 2 et 45 caractères.");
            validateNom = false;
        }

        if (validator.isAlpha(prenom, "fr-FR", { ignore: " -" }) && validator.isLength(prenom, { min: 2, max: 45 })) {
            validatePrenom = true;
        } else {
            console.log("Le prénom ne doit comporter que des lettres, espaces ou traits d'union et doit faire entre 2 et 45 caractères.");
            validatePrenom = false;
        }

        if (validator.isInt(telephone) && validator.isLength(telephone, { min: 9, max: 45 })) {
            validateTelephone = true;
        } else {
            console.log("Le numéro de téléphone ne doit comporter que des chiffres et doit faire entre 9 et 45 caractères.");
            validateTelephone = false;
        }

        if (validator.isEmail(email) && validator.isLength(email, { min: 2, max: 45 })) {
            validateEmail = true;
        } else {
            console.log("Le format de l'adresse mail est incorrect (exemple: adresse@email.be) et doit faire entre 6 et 45 caractères.");
            validateEmail = false;
        }

        if (validator.isAlpha(adresse, "fr-FR", { ignore: " 123456789-+" }) && validator.isLength(adresse, { min: 10, max: 45 })) {
            validateAdresse = true;
        } else {
            console.log("L'adresse ne peut comporter de caractères spéciaux et doit faire entre 10 et 45 caractères.");
            validateAdresse = false;
        }

        if (validator.isDate(date_naissance) && validator.isBefore(date_naissance, date)) {
            validateDateNaissance = true;
        } else {
            console.log("Le date doit être au format YYYY/MM/DD et avant la date d'aujourd'hui.");
            validateDateNaissance = false;
        }
        if (validateNom == true &&
            validatePrenom == true &&
            validateTelephone == true &&
            validateEmail == true &&
            validateAdresse == true &&
            validateDateNaissance == true) {
            return true;
        }
    }

    //Ajout d'un jeu
    app.post("/jeux", async (req, res) => {
        const jeu = req.body;

        try {
            if (jeux.validation(req) == true) {
                const {
                    insertId,
                } = await queryPromise("INSERT INTO jeux (titre, joueurs_min, joueurs_max, duree, age_recommande, mecanisme, mecanisme2, date_parution, editeur, commentaire, appartient) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                    [jeu.titre,
                    jeu.joueurs_min,
                    jeu.joueurs_max,
                    jeu.duree,
                    jeu.age_recommande,
                    jeu.mecanisme,
                    jeu.mecanisme2,
                    jeu.date_parution,
                    jeu.editeur,
                    jeu.commentaire,
                    jeu.appartient]);

                if (insertId != null) {
                    const [jeu] = await queryPromise("SELECT * FROM jeux WHERE id_jeux=?", [insertId]);
                    if (jeu) {
                        return res.json(jeu);
                    }
                }
                return res
                    .status(400)
                    .json({
                        error: "Impossible d'afficher le nouveau jeu."
                    });
            } else {
                return res
                    .status(400)
                    .json({
                        error: "Un ou plusieur champs sont erronés. Veuillez vous référer à la console."
                    })
            }
        } catch (e) {
            console.log(e);
            return res
                .status(400)
                .json({
                    error: "Impossible d'afficher le nouveau jeu."
                })
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
            const edit = await queryPromise("SELECT * FROM jeux WHERE id_jeux=?", [id]);
            if (edit.length === 0) {
                return res.status(404).json({
                    error: "Ce jeu n'existe pas."
                });
            }

            //Mise à jour du jeu
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

            const add = await queryPromise("UPDATE jeux SET titre = ?, joueurs_min = ?, joueurs_max = ?, duree = ?, age_recommande = ?, mecanisme = ?, mecanisme2 = ?, date_parution = ?, editeur = ?, commentaire = ?, appartient = ? WHERE id_jeux = ?", [jeu.titre, jeu.joueurs_min, jeu.joueurs_max, jeu.duree, jeu.age_recommande, jeu.mecanisme, jeu.mecanisme2, jeu.date_parution, jeu.editeur, jeu.commentaire, jeu.appartient, jeu.id_jeux]);
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
            const del = await queryPromise("DELETE FROM jeux WHERE id_jeux =?", [id]);
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
}