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
listMembre.confirmRemoveMembre = (membreId) => {
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
                    <button onclick="edition.showFormMembre(${membre.id_membre})" class ="btn btn-primary">Modifier
                </td>
                <td>
                    <button onclick="listMembre.confirmRemoveMembre(${membre.id_membre})" class ="btn btn-danger remove-line">Supprimer
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
    listJeux.jeu = await listJeux.getJeux();
    listJeux.importJeuxInTable(listJeux.jeu, true);
}

//Affichage d'un jeu
listJeux.jeuDetail = async (jeuID) => {
    listJeux.jeu = await listJeux.getJeux(jeuID);
    listJeux.importOneJeuInTable(listJeux.jeu, true);
    display.detailJeu();
}


//Récupération des jeux
listJeux.getJeux = (jeuID) => {
    let url = 'http://localhost:3000/jeux';

    //Si on a l'ID d'un jeu, on affiche les détails de celui-ci.
    if (jeuID) {
        url += `/${jeuID}`;
    }

    return jQuery
        .ajax({
            url,
            method: 'GET'
        })
        .catch((error) => {
            console.warn(error);
            return [];
        })
};

//Confirmation de la suppression
listJeux.confirmRemoveJeu = (jeuId) => {
    listJeux.jeuxToRemove = jeuId;
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
listJeux.importJeuxInTable = (jeux, clear) => {

    const tbody = jQuery("#list-jeux tbody");

    if (clear === true) {
        tbody.empty();
    }

    jeux.forEach((jeu) => {
        tbody.append(`
                <tr data-id="${jeu.id_jeux}" >
                <td>${jeu.titre}</td>
                <td>${jeu.joueurs_min}</td>
                <td>${jeu.joueurs_max}</td>
                <td>${jeu.duree}</td>
                <td>${jeu.age_recommande}</td>
                <td>${jeu.mecanisme}</td>
                <td>${jeu.mecanisme2}</td>
                <td>${jeu.editeur}</td>
                <td>
                    <button onclick="edition.showFormJeu(${jeu.id_jeux})" class = "btn btn-primary">Modifier
                </td>
                <td>
                    <button onclick="listJeux.confirmRemoveJeu(${jeu.id_jeux})" class ="btn btn-danger remove-line">Supprimer
                </td>
                <td>
                    <button onclick="listJeux.jeuDetail(${jeu.id_jeux})" class = "btn btn-info">Détails
                </td>
            </tr>`);
    });
};

listJeux.importOneJeuInTable = (jeu, clear) => {

    const tbody = jQuery("#details-list tbody")

    if (clear === true) {
        tbody.empty();
    }

    jeu.forEach((detail) => {//Arranger l'affichage ==> pour le moment c'est laid.
    const date = new Date(detail.date_parution);    
    tbody.append(`
            
            <tr data-id="${detail.id_jeux}"> <td>Titre : ${detail.titre}</td></tr>
            <tr><td>Nombre minimum de joueurs : ${detail.joueurs_min}</td></tr>
            <tr><td>Nombre maximum de joueurs : ${detail.joueurs_max}</td></tr>
            <tr><td>Durée du jeu (en minutes) : ${detail.duree}</td></tr>
            <tr><td>Age minimum recommandé : ${detail.age_recommande}</td></tr>
            <tr><td>Mecanisme principal du jeu : ${detail.mecanisme}</td></tr>
            <tr><td>Mecanisme secondaire : ${detail.mecanisme2}</td></tr>
            <tr><td>Date de parution du jeu : ${date.toLocaleDateString()}</td></tr>
            <tr><td>Editeur : ${detail.editeur}</td></tr>
            <tr><td>Commentaire sur le jeu : ${detail.commentaire}</td></tr>
            <tr><td>Propriétaire : ${detail.prenom} ${detail.nom}</td></tr>
            
        `)
    });
}

listJeux.init();

//_____________________________________________________________________________________JEUX D'UN MEMBRE_________________________________________________________________________________
const listMembreJeux = {};

listMembreJeux.init = async (membreId) => {
    listMembreJeux.membreJeu = await listMembreJeux.getMembreJeux(membreId);
    listMembreJeux.importMembreJeuxInTable(listMembreJeux.membreJeu, true);
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
listMembreJeux.importMembreJeuxInTable = (membreJeux, clear) => {
    const tbody = jQuery("#list-membre-jeux tbody");

    if (clear === true) {
        tbody.empty();
    }

    membreJeux.forEach((membreJeu) => {
        tbody.append(`
            <tr data-id="${membreJeu.id_jeux}">
                <td>${membreJeu.titre}</td>
                <td>${membreJeu.joueurs_min}</td>
                <td>${membreJeu.joueurs_max}</td>
                <td>${membreJeu.duree}</td>
                <td>${membreJeu.age_recommande}</td>
                <td>${membreJeu.mecanisme}</td>
                <td>${membreJeu.mecanisme2}</td>
                <td>${membreJeu.editeur}</td>
                <td id="appartient">${membreJeu.appartient}</td>
                <td>
                    <button onclick="edition.showFormJeu(${membreJeu.id_jeux})" class = "btn btn-primary">Modifier
                </td>
                <td>
                    <button onclick="listJeux.confirmRemoveJeu(${membreJeu.id_jeux})" class = "btn btn-danger remove-line">Supprimer
                </td>
                <td>
                    <button onclick="listJeux.jeuDetail(${membreJeu.id_jeux})" class = "btn btn-info">Détails
                </td>
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

listMembreJeux.init();