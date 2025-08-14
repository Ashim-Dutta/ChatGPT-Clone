// Home page logic for sending messages

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("message-form");
  const input = document.getElementById("message-input");
  const messages = document.getElementById("messages");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        addMessage(text, "user");
        input.value = "";
        // TODO: Send message to server and handle response
      }
    });
  }

  function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message " + sender;
    msgDiv.textContent = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
  }
});
