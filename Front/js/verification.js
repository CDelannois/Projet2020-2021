const verification = {}
let commentaire = $('#commentaire')[0];


verification.countCharacters = (e) => {
    let textEntered, countRemaining, counter;
    textEntered=$('#commentaire')[0].value;
    counter=(200-(textEntered.length));
    countRemaining = $('#caracteresRestant')[0];
    if (counter<0){
        countRemaining.textContent="Le texte inséré est trop long!";
    }else{
        countRemaining.textContent=counter + " caractères restant";
    }
};

$('#commentaire').keyup(verification.countCharacters);