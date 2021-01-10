//_________________________________________________________________________________MEMBRES_________________________________________________________________________________________
//Déclaration des variables
const listMembre = {};
listMembre.membreToRemove = null;
listMembre.init = async () => {
    const membre = await listMembre.getMembre();
    listMembre.importMembreInTable(membre);
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
listMembre.importMembreInTable = (membres) => {
    const tbody = jQuery("#list-membres tbody");
    membres.forEach((membre) => {
        tbody.append(`
            <tr data-id="${membre.id_membre}" >
                <td>${membre.nom}</td>
                <td>${membre.prenom}</td>
                <td>${membre.telephone}</td>
                <td>${membre.email}</td>
                <td>${membre.adresse}</td>
                <td>${membre.date_naissance}</td>` + //Problème avec l'affichage de la date.
                /*`<td>
                    <button onclick="listMembreJeux.init(${membre.id_membre})" class ="btn btn-info">Voir les jeux
                </td>*/
                `<td>
                    <button onclick="listMembre.confirmRemove(${membre.id_membre})" class ="btn btn-danger remove-line">Supprimer
                </td>
            </tr>`);
    });
    console.log('import membre', membres)
};

listMembre.init();

//_________________________________________________________________________________JEUX_________________________________________________________________________________________
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
            </tr>`);
    });
    console.log('import jeux', jeux)
};

listJeux.init();