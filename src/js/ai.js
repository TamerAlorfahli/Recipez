const form = document.querySelector(".chat-form");
const input = document.querySelector(".chat-input");
const chatHistory = document.querySelector(".chat-history");

function appendMessage(message, sender) {
  chatHistory.innerHTML = "";
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.innerText = message;
  
  messageContainer.appendChild(messageElement);
  
  if (sender === "user") {
    messageContainer.classList.add("user");
  } else {
    messageContainer.classList.add("bot");
  }
  
  chatHistory.appendChild(messageContainer);
}

async function openai_test(message) {
  const url = "https://api.openai.com/v1/completions";
  
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer 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");
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);
      const botResponse = response.choices[0].text;
      appendMessage(botResponse, "bot");
    }
  };
  //add recipe context
  const data = `{
    "model": "text-davinci-003",
    "prompt": "In the context of give me a recipe ${message}",
    "temperature": 0.7,
    "max_tokens": 4000,
    "top_p": 1,
    "frequency_penalty": 0.75,
    "presence_penalty": 0
  }`;
  
  xhr.send(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const message = input.value;
  input.value = "";
  
  appendMessage(message, "user");
  
  openai_test(message);
});
