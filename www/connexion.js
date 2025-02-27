document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Données du formulaire
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('userpwd');

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/htbin/login.py', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Afficher le message de retour
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = xhr.responseText;
        } else {
            console.error(xhr.statusText);
        }
    };

    xhr.send(new URLSearchParams(formData));
});

document.getElementById('login-username').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('login-button').click();
    }
});

document.getElementById('login-userpwd').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('login-button').click();
    }
});