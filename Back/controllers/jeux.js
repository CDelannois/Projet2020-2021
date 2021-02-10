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
            const jeux = await queryPromise("SELECT * FROM jeux WHERE id_jeux=?", [id]);
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
            const {
                insertId,
            } = await queryPromise("INSERT INTO jeux (id_jeux, titre, joueurs_min, joueurs_max, duree, age_recommande, mecanisme, mecanisme2, date_parution, editeur, commentaire, appartient) VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?)", [data.titre, data.joueurs_min, data.joueurs_max, data.duree, data.age_recommande, data.mecanisme, data.mecanisme2, data.date_parution, data.editeur, data.commentaire, data.appartient]);
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