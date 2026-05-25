const userInput =
    document.getElementById("user-input");
console.log("GitHub Jenkins Integration");
userInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        sendMessage();
    }
});

function sendMessage() {

    let message = userInput.value.trim();

    if (message === "") {

        return;
    }

    let chatBox =
        document.getElementById("chat-box");

    // User Message
    chatBox.innerHTML +=
    `<div class="user-message"> 
        User: ${message}

        <div class="time">
            ${getCurrentTime()}
        </div>

    </div>`;
    saveChatHistory();
    userInput.value = "";

    // Auto Scroll
    chatBox.scrollTop = chatBox.scrollHeight;

    // Typing Animation
    let typingDiv = document.createElement("div");

    typingDiv.className = "bot-message";

    typingDiv.id = "typing";

    typingDiv.innerText = "Bot is typing...";

    chatBox.appendChild(typingDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate Bot Delay
    setTimeout(() => {

        document.getElementById("typing").remove();

        let botReply = getBotReply(message);

        chatBox.innerHTML +=
    `<div class="bot-message"> 
        Bot: ${botReply}

        <div class="time">
            ${getCurrentTime()}
        </div>

    </div>`;

    saveChatHistory();
        chatBox.scrollTop = chatBox.scrollHeight;

    }, 1500);
}

function getBotReply(message) {

    switch(message.toLowerCase()) {

        case "hello":
            return "Hi, how can I help you?";

        case "help":
            return "Available options: Account, Payment, Support";

        case "payment":
            return "Payment support is available 24/7.";

        case "account":
            return "Please provide your account ID.";

        case "bye":
            return "Goodbye! Have a nice day.";

        default:
            return "Sorry, I don't understand.";
    }
}
function getCurrentTime() {

    let now = new Date();

    return now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}
function saveChatHistory() {

    let chatBox =
        document.getElementById("chat-box");

    localStorage.setItem(
        "chatHistory",
        chatBox.innerHTML
    );
}
window.onload = function() {

    let savedChats =
        localStorage.getItem("chatHistory");

    if (savedChats) {

        document.getElementById("chat-box")
            .innerHTML = savedChats;
    }
    window.onload = function() {

    // Load Chat History
    let savedChats =
        localStorage.getItem("chatHistory");

    if (savedChats) {

        document.getElementById("chat-box")
            .innerHTML = savedChats;
    }

    // Load Theme
    let savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");
    }
}
}
function clearChat() {

    localStorage.removeItem("chatHistory");

    document.getElementById("chat-box")
        .innerHTML = "";
}
function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    // Save Theme
    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");
    }
}
