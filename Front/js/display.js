const display = {};

//Afficher les jeux
display.showJeux = () => {
    jQuery('#jeux-table').show();
    jQuery('#membre-table').hide();
    jQuery('#membre-jeux-table').hide();
    jQuery('#jeu-detail-table').hide();
    jQuery('#button-add-jeu').show();
    jQuery("#button-display-jeux").hide();
    jQuery("#button-display-membre").show();
    jQuery('#button-add-membre').hide();
};

//Afficher les membres
display.showMembre = () => {
    jQuery('#jeux-table').hide();
    jQuery('#membre-table').show();
    jQuery('#membre-jeux-table').hide();
    jQuery('#jeu-detail-table').hide();
    jQuery('#button-add-jeu').hide();
    jQuery("#button-display-jeux").show();
    jQuery("#button-display-membre").hide();
    jQuery('#button-add-membre').show();
};

//Afficher les jeux d'un membre
display.showMembreJeux = () => {
    jQuery('#jeux-table').hide();
    jQuery('#membre-table').hide();
    jQuery('#membre-jeux-table').show();
    jQuery('#jeu-detail-table').hide();
    jQuery('#button-add-membre').hide();
    jQuery('#button-add-jeu').show();
    jQuery("#button-display-jeux").show();
    jQuery("#button-display-membre").show();
}

//Afficher les détails d'un jeu
display.detailJeu = () => {
    jQuery('#jeu-detail-table').show();
    jQuery('#jeux-table').hide();
    jQuery('#membre-jeux-table').hide();
    jQuery('#button-add-jeu').hide();
    jQuery("#button-display-jeux").show();
    jQuery("#button-display-membre").show();
    jQuery('#button-add-membre').hide();
}