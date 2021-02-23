module.exports = (app, queryPromise) => {

    // Récupération de tous les membres
    app.get("/membre", async (req, res) => {
        try {
            const membre = await queryPromise("SELECT * FROM membre");
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
            const membre = await queryPromise("SELECT * FROM membre WHERE id_membre=?", [id]);
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
        const membre = req.body;
        try {
            const {
                insertId,
            } = await queryPromise("INSERT INTO membre (id_membre, nom, prenom, telephone, email, adresse, date_naissance) VALUES (NULL,?,?,?,?,?,?)", [membre.nom, membre.prenom, membre.telephone, membre.email, membre.adresse, membre.date_naissance]);
            if (insertId != null) {
                const [membre] = await queryPromise("SELECT * FROM membre WHERE id_membre = ?", [insertId]);
                if (membre) {
                    return res.json(membre);
                }
            }
            return res
                .status(400)
                .json({
                    error: "Impossible d'afficher le nouveau membre."
                });
        } catch (e) {
            console.log(e);
            return res
                .status(400)
                .json({
                    error: "Impossible d'afficher le nouveau membre."
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
            const edit = await queryPromise("SELECT * FROM membre WHERE id_membre=?", [id]);
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
            
            const add = await queryPromise("UPDATE membre SET nom = ?, prenom = ?, telephone = ?, email = ?, adresse = ?, date_naissance = ? WHERE id_membre = ?", [membre.nom, membre.prenom, membre.telephone, membre.email, membre.adresse, membre.date_naissance, membre.id_membre]);
            res.json(membre);
        } catch (e) {
            return res.status(400).json({
                error: "Une erreur est survenue! " + e
            });
        }
    });

    //Suppression d'un membre
    app.delete("/membre/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const del = await queryPromise("DELETE FROM membre WHERE id_membre =?", [id]);
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
            });
        }
    });
}