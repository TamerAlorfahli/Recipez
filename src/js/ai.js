// const form = document.querySelector(".chat-form");
// const input = document.querySelector(".chat-input");
// const chatHistory = document.querySelector(".chat-history");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const text = input.value.trim();
//   if (text.length === 0) {
//     return;
//   }
//   input.value = "";

//   const { Configuration, OpenAIApi } = require("openai");
//   const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);
//   const response = await openai.createCompletion({
//     // model: "gpt-3.5-turbo",
//     // body: JSON.stringify({
//     //     prompt: text,
//     //     max_tokens: 100,
//     //     n: 1,
//     //     temperature: 0,
//     //     stop: "\n",
//     //   })
    
//   });
  

//   const data = await response.json();
//   const message = data.choices[0].text.trim();

//   const chatBubble = document.createElement("div");
//   chatBubble.classList.add("chat-bubble", "ai-message");
//   chatBubble.textContent = message;
//   chatHistory.appendChild(chatBubble);
//   chatHistory.scrollTop = chatHistory.scrollHeight;
// });



////

// const form = document.querySelector(".chat-form");
// const input = document.querySelector(".chat-input");
// const chatHistory = document.querySelector(".chat-history");

// working code //

// let open_ai_response;

// openai_test();

// async function openai_test() {
  
//   var url = "https://api.openai.com/v1/completions";

//   var xhr = new XMLHttpRequest();
//   xhr.open("POST", url);

//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.setRequestHeader("Authorization", "Bearer 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");

//   xhr.onreadystatechange = function () {
//      if (xhr.readyState === 4) {
//         console.log(xhr.status);
//         console.log(xhr.responseText);
//         open_ai_response = xhr.responseText;
//         console.log(open_ai_response);
//      }};

//   var data = `{
//     "model": "text-davinci-003",
//     "prompt": "how are you?",
//     "temperature": 0.7,
//     "max_tokens": 256,
//     "top_p": 1,
//     "frequency_penalty": 0.75,
//     "presence_penalty": 0
//   }`;

//   xhr.send(data);
// }

//////

// const form = document.querySelector(".chat-form");
// const input = document.querySelector(".chat-input");
// const chatHistory = document.querySelector(".chat-history");

// form.addEventListener("submit", async (e) => {
  
// const url = 'https://api.openai.com/v1/completions';

// const data = `{
//     "model": "gpt-3.5-turbo",
//     "prompt": "Say this is a test",
//     "max_tokens": 7,
//     "temperature": 0
//   }`;

// const response = await fetch(url, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer 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',
//     },
//     body: data,
// });

// const text = await response.text();

// console.log(text);
// });


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
