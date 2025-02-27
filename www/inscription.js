// Fonction pour valider le formulaire
function validateForm() {
    var lastname  = document.getElementById("lastname").value.trim();
    var firstname = document.getElementById("firstname").value.trim();
    var birthdate = document.getElementById("birthdate").value.trim();
    var username  = document.getElementById("username").value.trim();
    var userpwd   = document.getElementById("userpwd").value.trim();
    var email     = document.getElementById("useremail").value.trim();

	// Variables pour les alertes
    var alertLastname  = document.getElementById("alert-lastname");
    var alertFirstname = document.getElementById("alert-firstname");
    var alertBirthdate = document.getElementById("alert-birthdate");
    var alertUsername  = document.getElementById("alert-username");
    var alertUserpwd   = document.getElementById("alert-userpwd");
    var alertEmail     = document.getElementById("alert-useremail");

    // Fonction pour vérifier que les dates respectent le format jj/mm/aaaa
    function verifierFormatDate(dateString) {
        var regex = /^\d{2}\/\d{2}\/\d{4}$/;
    
        // Vérifier si la chaîne de date correspond à l'expression régulière
        if (!regex.test(dateString)) {
            return false; // Le format n'est pas correct
        }
    
        // Si la chaîne de date correspond au format, vérifier si c'est une date valide
        var dateParts = dateString.split('/');
        var day = parseInt(dateParts[0], 10);
        var month = parseInt(dateParts[1], 10) - 1; // Mois commence à 0 dans l'objet Date
        var year = parseInt(dateParts[2], 10);
        
        // Créer une nouvelle date avec les parties extraites
        var date = new Date(year, month, day);
    
        // Vérifier si les parties de la date correspondent à la date créée
        return (
            date.getDate() === day &&
            date.getMonth() === month &&
            date.getFullYear() === year
        );
    }

    if (lastname === "") {
        alertLastname.innerText = "Veuillez entrer votre nom.";
        alertLastname.style.display = "block";
        return false;
    } else {
        alertLastname.style.display = "none";
    }

    if (firstname === "") {
        alertFirstname.innerText = "Veuillez entrer votre prénom.";
        alertFirstname.style.display = "block";
        return false;
    } else {
        alertFirstname.style.display = "none";
    }

    if (verifierFormatDate(birthdate)) {
        alertBirthdate.style.display = "none";
    } else {
        alertBirthdate.innerText = "Date invalide. Veuillez saisir une date au format jj/mm/aaaa.";
        alertBirthdate.style.display = "block";
        return false;
    }

    if (username.length < 6) {
        alertUsername.innerText = "Le nom d'utilisateur doit contenir au moins 6 caractères.";
        alertUsername.style.display = "block";
        return false;
    } else {
        alertUsername.style.display = "none";
    }

    if (userpwd.length < 12) {
        alertUserpwd.innerText = "Le mot de passe doit contenir au moins 12 caractères.";
        alertUserpwd.style.display = "block";
        return false;
    } else {
        alertUserpwd.style.display = "none";
    }

    if (email.includes('@')) {
        alertEmail.style.display = "none";
    } else {
        alertEmail.innerText = "L'adresse email est invalide."
        alertEmail.style.display = "block";
        return false;
    }

    return true; // Return true si le formulaire est valide
}

// Fonction pour soumettre le formulaire d'inscription
function handleFormSubmit(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Récupérer les données du formulaire
    var formData = new FormData(document.getElementById("signup-form"));

    // Envoyer les données au serveur
    fetch("htbin/register.py", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (response.ok) {
            // Rediriger vers la page spécifique
            window.location.href = "connexion.html"; 
        } else {
            console.error("Erreur lors de l'inscription:", response.statusText);
        }
    })
    .catch(error => {
        console.error("Erreur lors de la requête:", error);
    });
}

document.getElementById("signup-form").addEventListener("submit", handleFormSubmit);
