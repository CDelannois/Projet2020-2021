const display = {};

//Boutons pour afficher les différents tableaux
display.buttonDisplayMembre = jQuery("#button-display-membre");
display.buttonDisplayJeux = jQuery("#button-display-jeux");
edition.buttonAddMembre = jQuery('#button-add-membre');

//Afficher les jeux
display.showJeux = () => {
    jQuery('#jeux_table').show();
    jQuery('#membre_table').hide();
    jQuery('#membre_jeux_table').hide();
    display.buttonDisplayJeux.hide();
    display.buttonDisplayMembre.show();
    edition.buttonAddMembre.hide();
};

//Afficher les membres
display.showMembre = () => {
    jQuery('#jeux_table').hide();
    jQuery('#membre_table').show();
    jQuery('#membre_jeux_table').hide();
    display.buttonDisplayJeux.show();
    display.buttonDisplayMembre.hide();
    edition.buttonAddMembre.show();
};

//Afficher les jeux d'un membre
display.showMembreJeux = () => {
    jQuery('#jeux_table').hide();
    jQuery('#membre_table').hide();
    jQuery('#membre_jeux_table').show();
    jQuery('#button-add-membre').hide();
    jQuery('#button-add-jeu').show();
    display.buttonDisplayJeux.show();
    display.buttonDisplayMembre.show();
}