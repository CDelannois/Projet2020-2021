const edition = {};

//Boutons
edition.buttonAddMembre = jQuery('#button-add-membre');
edition.buttonAddJeu= jQuery('#button-add-jeu');
edition.buttonCancelEdit = jQuery('#button-cancel-edit');

//Afficher le formulaire pour ajouter un membre
edition.showForm = () => {
    jQuery('#container-form').fadeIn();
    edition.buttonAddMembre.hide();
    edition.buttonCancelEdit.show();
};

//Effacer le formulaire pour ajouter un membre
edition.cleanForm = () => {
    jQuery('#container-form').fadeOut();
    edition.buttonAddMembre.show();
    edition.buttonCancelEdit.hide();
};

//Valider l'enregistrement d'un membre
edition.saveMembre = async (event) => {
    event.preventDefault(); //Arrêter l'exécution de l'envoi
    const nom = jQuery('#nom').val();
    const prenom = jQuery('#prenom').val();
    const telephone = jQuery('#telephone').val();
    const email = jQuery('#email').val();//Il faudra ajouter une vérification pour que l'adresse respecte le format *@*.*
    const adresse = jQuery('#adresse').val();
    const date_naissance = jQuery('#date_naissance').val();
    
    try {
        const newMembre = await jQuery.ajax({
            url: 'http://localhost:3000/membre',
            method: 'POST',
            data: {
                nom,
                prenom,
                telephone,
                email,
                adresse,
                date_naissance,
            }
        });
        list.importMembreInTable([newMembre]);
        edition.cleanForm();
    } catch (error) {
        console.error(error);
    }
}