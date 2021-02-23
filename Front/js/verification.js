const verification = {}

//_________________________________________________________________________________MEMBRES______________________________________________________________________________________________

/*Le bouton "Envoyer est désactivé. Il ne sera activé que quand toutes les variables des lignes 8 à 13 seront TRUE. Chacune de ces variable reçoit la valeur TRUE si
les différentes conditions du champ correspondant sont remplies.*/
$('#saveMembre').prop("disabled", true);
let nomOk = false;
let prenomOk = false;
let telephoneOk = false;
let emailOk = false;
let adresseOk = false;
let dateNaissanceOk = false;

//Champ nom
verification.verificationNom = (e) => {

    let nom = $('#nom')[0].value;
    let erreurAlphaNom = $('#erreur-alpha-nom')[0];
    let erreurEmptyNom = $('#erreur-empty-nom')[0];
    let erreurLengthNom = $('#erreur-length-nom')[0];
    let alphaNom = false;
    let emptyNom = true;
    let lengthNom = false;

    if (!validator.isAlpha(nom, "fr-FR")) {
        erreurAlphaNom.textContent = "Ce champ ne peut comporter que des lettres.";
        alphaNom = false;
    } else {
        erreurAlphaNom.textContent = "";
        alphaNom = true;
    };

    if (validator.isEmpty(nom)) {
        erreurEmptyNom.textContent = "Ce champ doit être rempli.";
        emptyNom = true;
    } else {
        erreurEmptyNom.textContent = "";
        emptyNom = false;
    };

    if (!validator.isLength(nom, { min: 2, max: 45 })) {
        erreurLengthNom.textContent = "Le nom doit comporter au moins deux caractères et maximum 45 caractères!";
        lengthNom = false;
    } else {
        erreurLengthNom.textContent = "";
        lengthNom = true;
    };

    if (alphaNom === false || emptyNom === true || lengthNom === false) { //Si chaque condition est remplie, la variable globale nomOk devient true.
        nomOk = false;
    } else {
        nomOk = true;
    }
}
$('#nom').keyup(verification.verificationNom);

//Champ prénom
verification.verificationPrenom = (e) => {

    let prenom = $('#prenom')[0].value;
    let erreurAlphaPrenom = $('#erreur-alpha-prenom')[0];
    let erreurEmptyPrenom = $('#erreur-empty-prenom')[0];
    let erreurLengthPrenom = $('#erreur-length-prenom')[0];
    let alphaPrenom = false;
    let emptyPrenom = true;
    let lengthPrenom = false;


    if (!validator.isAlpha(prenom, "fr-FR")) {
        erreurAlphaPrenom.textContent = "Ce champ ne peut comporter que des lettres.";
        alphaPrenom = false;
    } else {
        erreurAlphaPrenom.textContent = "";
        alphaPrenom = true;
    };

    if (validator.isEmpty(prenom)) {
        erreurEmptyPrenom.textContent = "Ce champ doit être rempli.";
        emptyPrenom = true;
    } else {
        erreurEmptyPrenom.textContent = "";
        emptyPrenom = false;
    };

    if (!validator.isLength(prenom, { min: 2, max: 45 })) {
        erreurLengthPrenom.textContent = "Le prénom doit comporter au moins deux caractères et maximum 45 caractères!";
        lengthPrenom = false;
    } else {
        erreurLengthPrenom.textContent = "";
        lengthPrenom = true;
    };

    if (alphaPrenom === false || emptyPrenom === true || lengthPrenom === false) {
        prenomOk = false;
    } else {
        prenomOk = true;
    }
}
$('#prenom').keyup(verification.verificationPrenom);

//Champ telephone
verification.verificationTelephone = (e) => {
    let telephone = $('#telephone')[0].value;
    let erreurIntTelephone = $('#erreur-int-telephone')[0];
    let erreurEmptyTelephone = $('#erreur-empty-telephone')[0];
    let erreurLengthTelephone = $('#erreur-length-telephone')[0];
    let intTelephone = false;
    let emptyTelephone = true;
    let lengthTelephone = false;

    if (!validator.isInt(telephone)) {
        erreurIntTelephone.textContent = "Ce champ ne peut comporter que chiffres.";
        intTelephone = false;
    } else {
        erreurIntTelephone.textContent = "";
        intTelephone = true;
    };

    if (validator.isEmpty(telephone)) {
        erreurEmptyTelephone.textContent = "Ce champ doit être rempli.";
        emptyTelephone = true;
    } else {
        erreurEmptyTelephone.textContent = "";
        emptyTelephone = false;
    };

    if (!validator.isLength(telephone, { min: 9, max: 45 })) {
        erreurLengthTelephone.textContent = "Le numéro de téléphone doit comporter au moins neuf caractères et maximum 45 caractères!";
        lengthTelephone = false;
    } else {
        erreurLengthTelephone.textContent = "";
        lengthTelephone = true;
    };

    if (intTelephone === false || emptyTelephone === true || lengthTelephone === false) {
        telephoneOk = false;
    } else {
        telephoneOk = true;
    }
}
$('#telephone').keyup(verification.verificationTelephone);

//Champ email

verification.verificationEmail = (e) => {

    let email = $('#email')[0].value;
    let erreurIsEmail = $('#erreur-is-email')[0];
    let erreurEmptyEmail = $('#erreur-empty-email')[0];
    let erreurLengthEmail = $('#erreur-length-email')[0];
    let isEmail = false;
    let emptyEmail = true;
    let lengthEmail = false;

    if (!validator.isEmail(email)) {
        erreurIsEmail.textContent = "L'adresse email n'est pas valide.";
        isEmail = false;
    } else {
        erreurIsEmail.textContent = "";
        isEmail = true;
    };

    if (validator.isEmpty(email)) {
        erreurEmptyEmail.textContent = "Ce champ doit être rempli.";
        emptyEmail = true;
    } else {
        erreurEmptyEmail.textContent = "";
        emptyEmail = false;
    };

    if (!validator.isLength(email, { min: undefined, max: 45 })) {
        erreurLengthEmail.textContent = "Ce champ peut comporter au maximum 45 caractères!";
        lengthEmail = false;
    } else {
        erreurLengthEmail.textContent = "";
        lengthEmail = true;
    };

    if (isEmail === false || emptyEmail === true || lengthEmail === false) {
        emailOk = false;
    } else {
        emailOk = true;
    }
}
$('#email').keyup(verification.verificationEmail);

//Champ adresse

verification.verificationAdresse = (e) => {

    let adresse = $('#adresse')[0].value;
    let erreurAlphaAdresse = $('#erreur-alpha-adresse')[0];
    let erreurEmptyAdresse = $('#erreur-empty-adresse')[0];
    let erreurLengthAdresse = $('#erreur-length-adresse')[0];
    let alphaAdresse = false;
    let emptyAdresse = true;
    let lengthAdresse = false;

    if (!validator.isAlpha(adresse, 'fr-FR', { ignore: " 123456789+" })) {
        erreurAlphaAdresse.textContent = "Ce champ ne peut pas comporter de caractères spéciaux!";
        alphaAdresse = false;
    } else {
        erreurAlphaAdresse.textContent = "";
        alphaAdresse = true;
    };

    if (validator.isEmpty(adresse)) {
        erreurEmptyAdresse.textContent = "Ce champ doit être rempli.";
        emptyAdresse = true;
    } else {
        erreurEmptyAdresse.textContent = "";
        emptyAdresse = false;
    };

    if (!validator.isLength(adresse, { min: 10, max: 200 })) {
        erreurLengthAdresse.textContent = "Ce champ doit comporter entre 10 et 200 caractères!";
        lengthAdresse = false;
    } else {
        erreurLengthAdresse.textContent = "";
        lengthAdresse = true;
    };

    if (alphaAdresse === false || emptyAdresse === true || lengthAdresse === false) {
        adresseOk = false;
    } else {
        adresseOk = true;
    }
}
$('#adresse').keyup(verification.verificationAdresse);

//Champ adresse

verification.verificationDateNaissance = (e) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(); //Permet de récupérer la date du jour au format date.

    let dateNaissance = $('#date_naissance')[0].value;
    let erreurDateNaissance = $('#erreur-date-naissance')[0];
    let beforeDateNaissance = false;

    if (!validator.isBefore(dateNaissance, date)) {
        erreurDateNaissance.textContent = "La date ne peut dépasser la date actuelle.";
        beforeDateNaissance = false;
    } else {
        erreurDateNaissance.textContent = "";
        beforeDateNaissance = true;
    };

    if (beforeDateNaissance === false) {
        dateNaissanceOk = false;
    } else {
        dateNaissanceOk = true;
    }
}
$('#date_naissance').change(verification.verificationDateNaissance);

//Déblocage du bouton
verification.unlockButton = (e) => {
    if (nomOk === true && prenomOk === true && telephoneOk === true && emailOk === true && adresseOk === true && dateNaissanceOk === true) {
        $('#saveMembre').prop("disabled", false);
    } else {
        $('#saveMembre').prop("disabled", true);
    }
}
$('#nom').keyup(verification.unlockButton);
$('#prenom').keyup(verification.unlockButton);
$('#telephone').keyup(verification.unlockButton);
$('#email').keyup(verification.unlockButton);
$('#adresse').keyup(verification.unlockButton);
$('#date_naissance').change(verification.unlockButton);

//_________________________________________________________________________________JEUX______________________________________________________________________________________________

verification.verificationJeux = (e) => {

    validator.isLength(titre, { min: 0, max: 45 });
    validator.isEmpty(titre);
    validator.isInt(joueurs_max);
    validator.isEmpty(joueurs_max);
    validator.isInt(joueurs_min, { min: 1, max: joueurs_max });
    validator.isEmpty(joueurs_min);
    validator.isInt(duree, { min: 1, max: undefined });
    validator.isEmpty(duree);
    validator.isInt(age_recommande, { min: 1, max: 99 });
    validator.isEmpty(age_recommande);
    validator.isLength(mecanisme, { min: 0, max: 45 });
    validator.isEmpty(mecanisme);
    validator.isAlpha(mecanisme, 'fr-FR', { ignore: " " });
    validator.isLength(mecanisme2, { min: 0, max: 45 });
    validator.isAlpha(mecanisme2, 'fr-FR', " ");
    validator.isBefore(date_parution, '');
    validator.isEmpty(date_parution);
    validator.isLength(editeur, { min: 0, max: 45 });
    validator.isEmpty(editeur);
    validator.isLength(commentaire, { min: 0, max: 200 });
}
//Commentaire sur le jeu, affichage du nombre de caractères restant.
let commentaire = $('#commentaire')[0];


verification.countCharacters = (e) => {
    let textEnteredCommentaire, countRemaining, counter;
    textEnteredCommentaire = $('#commentaire')[0].value;
    counter = (200 - (textEnteredCommentaire.length));
    countRemaining = $('#caracteresRestant')[0];
    if (counter < 0) {
        countRemaining.textContent = "Le texte inséré est trop long!";
    } else {
        countRemaining.textContent = counter + " caractères restant";
    }
};

$('#commentaire').keyup(verification.countCharacters);