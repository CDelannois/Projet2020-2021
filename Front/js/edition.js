//Pour le moment je ne travaille que sur les membres, il faudra ajouter les jeux par après

const edition = {};

//Boutons
edition.buttonAddMembre = jQuery('#button-add-membre');
edition.buttonAddJeu = jQuery('#button-add-jeu');
edition.buttonCancelEdit = jQuery('#button-cancel-edit');

//Afficher le formulaire pour ajouter un membre
edition.showForm = (membreID) => {
    //si on a un ID, on appelle populate
    if (membreID) {
        edition.populateMembre(membreID);
    }
    jQuery('#container-form').fadeIn();
    edition.buttonAddMembre.hide();
    edition.buttonCancelEdit.show();
};

edition.populateMembre = (membreID) => {
    edition.cleanForm();
    //D'abord on récupère l'ID du membre à modifier
    const membre = listMembre.membre.find(membre => membre.id_membre === membreID);
    //Si le membre existe
    if (membre) {
        jQuery('#id_membre').val(membre.id_membre);
        jQuery('#nom').val(membre.nom);
        jQuery('#prenom').val(membre.prenom);
        jQuery('#telephone').val(membre.telephone);
        jQuery('#email').val(membre.email);
        jQuery('#adresse').val(membre.adresse);
        jQuery('#date_naissance').val(membre.date_naissance);
    }
}

//Effacer le formulaire pour ajouter un membre
edition.hideForm = () => {
    jQuery('#container-form').fadeOut();
    edition.buttonAddMembre.show();
    edition.buttonCancelEdit.hide();
    edition.cleanForm();
};

edition.cleanForm = () => {
    jQuery('#id_membre').val('');
    jQuery('#nom').val('');
    jQuery('#prenom').val('');
    jQuery('#telephone').val('');
    jQuery('#email').val('');
    jQuery('#adresse').val('');
    jQuery('#date_naissance').val('');
}

//Valider l'enregistrement d'un membre
edition.saveMembre = async (event) => {
    event.preventDefault(); //Arrêter l'exécution de l'envoi
    const id = jQuery('#id_membre').val();
    const isEdition = id.length > 0;
    const nom = jQuery('#nom').val();
    const prenom = jQuery('#prenom').val();
    const telephone = jQuery('#telephone').val();
    const email = jQuery('#email').val(); //Il faudra ajouter une vérification pour que l'adresse respecte le format *@*.* voir https://www.w3resource.com/javascript/form/email-validation.php
    const adresse = jQuery('#adresse').val();
    const date_naissance = jQuery('#date_naissance').val();
    

    let url = 'http://localhost:3000/membre';

    if (isEdition) {
        url += `/${id}`;
    }

    try {
        const newMembre = await jQuery.ajax({
            url,
            method: "POST",
            data: {
                nom,
                prenom,
                telephone,
                email,
                adresse,
                date_naissance,
            }
        });
        if (isEdition) {
            listMembre.init();
        } else {
            listMembre.importMembreInTable([newMembre]);
        }
        edition.hideForm();
    } catch (error) {
        console.error(error);
    }
}