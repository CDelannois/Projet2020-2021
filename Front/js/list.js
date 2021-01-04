//Déclaration des variables
const list = {};
list.membreToRemove = null;
list.init = async () => {
    const membre = await list.getMembre();
    list.importMembreInTable(membre);
}

//Récupération des membres
list.getMembre = () => {

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
list.confirmRemove = (membreId) => {
    list.membreToRemove = membreId;
    console.log('ID ', membreId);
    jQuery('#remove-membre-modal').modal('toggle');
}

//Suppression d'un membre
list.remove = async () => {
    const membreId = list.membreToRemove;
    try {
        await jQuery
            .ajax({
                url: `http://localhost:3000/membre/${membreId}`,
                method: "DELETE",
            });
        jQuery(`[data-id="${membreId}"]`).fadeOut('slow');
    } catch (error) {
        console.error(error);
        alert('Une erreur est survenue. Impossible de supprimer le membre.');// Récupérer le code SQL et faire un message qui précise qu'on ne peut pas supprimer un membre qui possède encore des jeux.
    } finally {
        jQuery("#remove-membre-modal").modal('hide');
    }

}

//Liste des membres
list.importMembreInTable = (membres) => {
    const tbody = jQuery("#list-membres tbody");
    membres.forEach((membre) => {
        tbody.append(`
            <tr data-id="${membre.id_membre}" >
                <td>${membre.nom}</td>`+//Ajouter un lien qui permet d'afficher directement les jeux de ce membre.
                `<td>${membre.prenom}</td>
                <td>${membre.telephone}</td>
                <td>${membre.email}</td>
                <td>${membre.adresse}</td>
                <td>${membre.date_naissance}</td>`+//Problème avec l'affichage de la date.
                `<td>
                    <button onclick="list.confirmRemove(${membre.id_membre})" class ="btn btn-danger remove-line">Supprimer
                </td>
            </tr>`);
    });
    console.log('import membre', membres)
};

list.init();

//Liste des Jeux !PAS TERMINE, il faut ajouter le reste (adapter lignes 1 à 47 + 69)
list.importJeuxInTable = (jeux) => {
    const tbody = jQuery("#list-jeux tbody");
    jeux.forEach((jeu) => {
        tbody.append(`
            <tr data-id="${jeu.id_jeu}" >
                <td>${jeu.titre}</td>`+//Ajouter un lien qui permet d'afficher directement les détail de ce jeu.
                `<td>${jeu.joueurs_min}</td>
                <td>${jeu.joueurs_max}</td>
                <td>${jeu.duree}</td>
                <td>${jeu.age_recommande}</td>
                <td>${jeu.mecanisme}</td>
                <td>${jeu.mecanisme2}</td>
                <td>${jeu.editeur}</td>
                <td>
                    <button onclick="list.confirmRemove(${jeu.id_jeu})" class ="btn btn-danger remove-line">Supprimer
                </td>
            </tr>`);
    });
    console.log('import jeux', jeux)
};