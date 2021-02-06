// Adapter les dates avec https://www.npmjs.com/package/moment

//_________________________________________________________________________________MEMBRES______________________________________________________________________________________________
//Déclaration des variables
const listMembre = {};
listMembre.membreToRemove = null;
listMembre.init = async () => {
    listMembre.membre = await listMembre.getMembre();
    listMembre.importMembreInTable(listMembre.membre, true);
}

//Récupération des membres
listMembre.getMembre = () => {
    return jQuery
        .ajax({
            url: 'http://localhost:3000/membre',
            method: 'GET'
        })
        .catch((error) => {
            console.warn(error);
            return [];
        })
};

//Confirmation de la suppression
listMembre.confirmRemove = (membreId) => {
    listMembre.membreToRemove = membreId;
    console.log('ID ', membreId);
    jQuery('#remove-membre-modal').modal('toggle');
}

//Suppression d'un membre
listMembre.remove = async () => {
    const membreId = listMembre.membreToRemove;
    try {
        await jQuery
            .ajax({
                url: `http://localhost:3000/membre/${membreId}`,
                method: "DELETE",
            });
        jQuery(`[data-id="${membreId}"]`).fadeOut('slow');
    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue. Impossible de supprimer le membre.'); // Récupérer le code SQL et faire un message qui précise qu'on ne peut pas supprimer un membre qui possède encore des jeux.
    } finally {
        jQuery("#remove-membre-modal").modal('hide');
    }
}

//Liste des membres
listMembre.importMembreInTable = (membres, clear) => {
    const tbody = jQuery("#list-membres tbody");

    if (clear === true) {
        tbody.empty();
    }

    tbody.append(
        membres.map((membre) => {
            const date = new Date(membre.date_naissance);
            return `
            <tr data-id="${membre.id_membre}" >
                <td>${membre.nom}</td>
                <td>${membre.prenom}</td>
                <td>${membre.telephone}</td>
                <td>${membre.email}</td>
                <td>${membre.adresse}</td>
                <td>${date.toLocaleDateString()}</td>
                <td>
                    <button onclick="listMembreJeux.showJeux(${membre.id_membre})" class ="btn btn-info">Voir les jeux
                </td>
                <td>
                    <button onclick="edition.showForm(${membre.id_membre})" class ="btn btn-primary">Modifier
                </td>
                <td>
                    <button onclick="listMembre.confirmRemove(${membre.id_membre})" class ="btn btn-danger remove-line">Supprimer
                </td>
            </tr>`;
        })
    );
}

listMembre.init();

//__________________________________________________________________________________JEUX________________________________________________________________________________________________
const listJeux = {};
listJeux.jeuxToRemove = null;
listJeux.init = async () => {
    const jeu = await listJeux.getJeux();
    listJeux.importJeuxInTable(jeu);
}

//Récupération des jeux
listJeux.getJeux = () => {
    return jQuery
        .ajax({
            url: 'http://localhost:3000/jeux',
            method: 'GET'
        })
        .catch((error) => {
            console.warn(error);
            return [];
        })
};

//Récupération d'un jeu pour afficher les détails
listJeux.jeuDetail = () => {
    console.log("Coucou!");
}

//Confirmation de la suppression
listJeux.confirmRemove = (jeuId) => {
    listJeux.jeuxToRemove = jeuId;
    console.log('ID ', jeuId);
    jQuery('#remove-jeu-modal').modal('toggle');
}

//Suppression d'un jeu
listJeux.remove = async () => {
    const jeuId = listJeux.jeuxToRemove;
    try {
        await jQuery
            .ajax({
                url: `http://localhost:3000/jeux/${jeuId}`,
                method: "DELETE",
            });
        jQuery(`[data-id="${jeuId}"]`).fadeOut('slow');
    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue. Impossible de supprimer le jeu.');
    } finally {
        jQuery("#remove-jeu-modal").modal('hide');
    }
}

//Liste des jeux
listJeux.importJeuxInTable = (jeux) => {
    const tbody = jQuery("#list-jeux tbody");
    jeux.forEach((jeu) => {
        tbody.append(`
                <tr data-id="${jeu.id_jeux}" >
                <td>${jeu.titre}</td>` + //Ajouter un lien qui permet d'afficher directement les détail de ce jeu.
            `<td>${jeu.joueurs_min}</td>
                <td>${jeu.joueurs_max}</td>
                <td>${jeu.duree}</td>
                <td>${jeu.age_recommande}</td>
                <td>${jeu.mecanisme}</td>
                <td>${jeu.mecanisme2}</td>
                <td>${jeu.editeur}</td>
                <td>
                    <button onclick="listJeux.confirmRemove(${jeu.id_jeux})" class ="btn btn-danger remove-line">Supprimer
                </td>
                <td>
                    <button onclick="listJeux.jeuDetail(${jeu.id_jeux})" class = "btn btn-info">Détails`+ //Ajouter l'action du bouton
                `</td>
            </tr>`);
    });
};

listJeux.init();

//_____________________________________________________________________________________JEUX D'UN MEMBRE_________________________________________________________________________________
const listMembreJeux = {};

listMembreJeux.init = async (membreId) => {
    const membreJeu = await listMembreJeux.getMembreJeux(membreId);
    listMembreJeux.importMembreJeuxInTable(membreJeu);
    console.log(membreJeu);
}

//Récupération des jeux liés aux membres
listMembreJeux.getMembreJeux = (membreId) => {
    return jQuery
        .ajax({
            url: `http://localhost:3000/membreJeux/${membreId}`,
            method: 'GET'
        })
        .catch((error) => {
            console.warn(error);
            return [];
        })
};

//Liste des jeux
listMembreJeux.importMembreJeuxInTable = (membreJeux) => {
    const tbody = jQuery("#list-membre-jeux tbody");
    membreJeux.forEach((membreJeu) => {
        tbody.append(`
                <tr data-id="${membreJeu.id_jeux}" >
                <td>${membreJeu.titre}</td>
                <td>${membreJeu.joueurs_min}</td>
                <td>${membreJeu.joueurs_max}</td>
                <td>${membreJeu.duree}</td>
                <td>${membreJeu.age_recommande}</td>
                <td>${membreJeu.mecanisme}</td>
                <td>${membreJeu.mecanisme2}</td>
                <td>${membreJeu.editeur}</td>
                <td>
                    <button onclick="listJeux.confirmRemove(${membreJeu.id_jeux})" class = "btn btn-danger remove-line">Supprimer
                </td>
                <td>
                    <button onclick="listJeux.jeuDetail(${membreJeu.id_jeux})" class = "btn btn-info">Détails`+ //Ajouter l'action du bouton
                `</td>
            </tr>`);
    });
};

//Vider la liste des jeux d'un membre pour permettre d'afficher d'autres listes
listMembreJeux.emptyList = () => {
    $("#body-list-membre-jeux").empty();
}

//Affichage des jeux d'un membre
listMembreJeux.showJeux = (membreId) => {
    listMembreJeux.emptyList();
    listMembreJeux.init(membreId);
    display.showMembreJeux();
};