const display = {};

//Boutons pour afficher les différents tableaux
display.buttonDisplayMembre=jQuery("#button-display-membre");
display.buttonDisplayJeux=jQuery("#button-display-jeux");
edition.buttonAddMembre = jQuery('#button-add-membre');

//Afficher les jeux
display.showJeux = () => {
    jQuery('#jeux_table').show();
    jQuery('#membre_table').hide();
    display.buttonDisplayJeux.hide();
    display.buttonDisplayMembre.show();
    edition.buttonAddMembre.hide();
};

//Afficher les membres
display.showMembre = () => {
    jQuery('#jeux_table').hide();
    jQuery('#membre_table').show();
    display.buttonDisplayJeux.show();
    display.buttonDisplayMembre.hide();
    edition.buttonAddMembre.show();  
};