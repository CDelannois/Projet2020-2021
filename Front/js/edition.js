const edition = {};

//Boutons
edition.buttonAddMembre = jQuery('#button-add-membre');
edition.buttonCancelEditMembre = jQuery('#button-cancel-edit-membre');
edition.buttonCancelEditJeu = jQuery('#button-cancel-edit-jeu');

//___________________________________________________________________________AJOUT ET EDITION MEMBRE____________________________________________________________________________________

//Afficher le formulaire pour ajouter un membre
edition.showFormMembre = (membreID) => {
    //si on a un ID, on appelle populate
    if (membreID) {
        edition.populateMembre(membreID);
    }
    jQuery('#container-form-membre').fadeIn();
    edition.buttonAddMembre.hide();
    edition.buttonCancelEditMembre.show();
};

edition.populateMembre = (membreID) => {
    edition.cleanFormMembre();
    //D'abord on récupère l'ID du membre à modifier
    const membre = listMembre.membre.find(membre => membre.id_membre === membreID);
    //Si le membre existe
    if (membre) {
        const date = membre.date_naissance.slice(0, 10);
        jQuery('#id_membre').val(membre.id_membre);
        jQuery('#nom').val(membre.nom);
        jQuery('#prenom').val(membre.prenom);
        jQuery('#telephone').val(membre.telephone);
        jQuery('#email').val(membre.email);
        jQuery('#adresse').val(membre.adresse);
        jQuery('#date_naissance').val(date);
    }
}

//Effacer le formulaire pour ajouter un membre
edition.hideFormMembre = () => {
    jQuery('#container-form-membre').fadeOut();
    edition.buttonAddMembre.show();
    edition.buttonCancelEditMembre.hide();
    edition.cleanFormMembre();
};

edition.cleanFormMembre = () => {
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

        edition.hideFormMembre();
    } catch (error) {
        console.log("Something went wrong!")
        console.error(error);
    }
}

//__________________________________________________________________________________AJOUT ET EDITION JEUX__________________________________________________________________________________

//Afficher le formulaire pour ajouter un jeu
edition.showFormJeu = (jeuID) => {
    //si on a un ID, on appelle populate
    if (jeuID) {
        edition.populateJeu(jeuID);
        console.log("L'ID du jeu à modifier est : " + jeuID);
    }
    jQuery('#container-form-jeu').fadeIn();
    edition.buttonCancelEditJeu.show();
};

//Pour l'édition d'un jeu: on récupère les infos qu'on place dans le formulaire.
edition.populateJeu = (jeuID) => {
    edition.cleanFormJeu();
    //D'abord on récupère l'ID du jeu à modifier
    const jeu = listJeux.jeu.find((jeu) => jeu.id_jeux === jeuID);
    //Si le jeu existe
    if (jeu) {
        const date = jeu.date_parution.slice(0, 10);
        jQuery('#id_jeu').val(jeu.id_jeu);
        jQuery('#titre').val(jeu.titre);
        jQuery('#joueurs_min').val(jeu.joueurs_min);
        jQuery('#joueurs_max').val(jeu.joueurs_max);
        jQuery('#duree').val(jeu.duree);
        jQuery('#age_recommande').val(jeu.age_recommande);
        jQuery('#mecanisme').val(jeu.mecanisme);
        jQuery('#mecanisme2').val(jeu.mecanisme2);
        jQuery('#date_parution').val(date);
        jQuery('#editeur').val(jeu.editeur);
        jQuery('#commentaire').val(jeu.commentaire);
        jQuery('#appartient').val(jeu.appartient);
    }
}

//Effacer le formulaire pour ajouter un jeu
edition.hideFormJeu = () => {
    jQuery('#container-form-jeu').fadeOut();
    edition.buttonCancelEditJeu.hide();
    edition.cleanFormJeu();
};

edition.cleanFormJeu = () => {
    jQuery('#id_jeu').val('');
    jQuery('#titre').val('');
    jQuery('#joueurs_min').val('');
    jQuery('#joueurs_max').val('');
    jQuery('#duree').val('');
    jQuery('#age_recommande').val('');
    jQuery('#mecanisme').val('');
    jQuery('#mecanisme2').val('');
    jQuery('#date_parution').val('');
    jQuery('#editeur').val('');
    jQuery('#commentaire').val('');
    jQuery('#appartient').val();
}

//Valider l'enregistrement d'un jeu
edition.saveJeu = async (event) => {
    event.preventDefault(); //Arrêter l'exécution de l'envoi
    const id = jQuery('#id_jeu').val();
    const isEdition = id.length > 0;
    const titre = jQuery('#titre').val();
    const joueurs_min = jQuery('#joueurs_min').val();
    const joueurs_max = jQuery('#joueurs_max').val();
    const duree = jQuery('#duree').val(); //Il faudra ajouter une vérification pour que l'adresse respecte le format *@*.* voir https://www.w3resource.com/javascript/form/email-validation.php
    const age_recommande = jQuery('#age_recommande').val();
    const mecanisme = jQuery('#mecanisme').val();
    const mecanisme2 = jQuery('#mecanisme2').val();
    const date_parution = jQuery('#date_parution').val();
    const editeur = jQuery('#editeur').val();
    const commentaire = jQuery('#commentaire').val();
    const appartient = jQuery('#appartient').val();

    let url = 'http://localhost:3000/jeux';

    if (isEdition) {
        url += `/${id}`;
    }


    try {
        const newJeu = await jQuery.ajax({
            url,
            method: "POST",
            data: {
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
                appartient,
            }
        });
        if (isEdition) {
            listMembreJeux.init();
        } else {
            listJeux.importJeuxInTable([newJeu]);
        }
        edition.hideFormJeu();
    } catch (error) {
        console.log("Something went wrong!")
        console.error(error);
    }
}