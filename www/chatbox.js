$(document).ready(function () {
    loadMessages();

    $("#send-button").click(function () {
        sendMessage();
    });

    $("#message-input").keypress(function (e) {
        if (e.which === 13) {
            sendMessage();
        }
    });
});

// Fonction pour envoyer un message
function sendMessage() {
    const messageInput = $("#message-input");
    const message = messageInput.val();

    if (message.trim() === "") {
        return;
    }

    $("#send-button").prop("disabled", true);

    // Envoyer le message au serveur
    $.post("htbin/chatsend.py", { msg: message }, function (response) {
        if (response.num === 0) {
            messageInput.val("");
            displayMessage(response.msg, true);
            loadMessages();
        } else if (response.num === 1) {
            alert(response.msg);
        } else if (response.num === -1) {
            alert(response.msg);
        }

        $("#send-button").prop("disabled", false);
    });
}

// Fonction pour charger les messages
function loadMessages() {
    $.get("htbin/chatget.py", function (messages) {
        $("#chat-messages").empty();

        // afficher les messages
        messages.forEach(function (message) {
            displayMessage(
                `[${message.date} ${message.time}] ${message.user}: ${message.msg}`,
                false
            );
        });
    });
}

// Fonction pour afficher un message
function displayMessage(message, isOwnMessage) {
    const chatBoxDiv = $("#chat-messages");
    const newMessageDiv = $("<div></div>").text(message);

    if (isOwnMessage) {
        newMessageDiv.addClass("outgoing-message");
    } else {
        newMessageDiv.addClass("incoming-message");
    }

    chatBoxDiv.append(newMessageDiv);

    // Naviguer dans la chatbox
    chatBoxDiv.animate({ scrollTop: chatBoxDiv[0].scrollHeight }, "slow");
}