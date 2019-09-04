/* Init Websocket */
const socket = io();

/* DOM elements */
let message = document.getElementById("message");
let username = document.getElementById("username");
let button = document.getElementById("button");
let output = document.getElementById("output_container");
let actions = document.getElementById("actions");

button.addEventListener("click", () => {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value
  });
  console.log("Click");
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username.value);
});

socket.on("chat:message", function(data) {
  actions.innerHTML = "";
  output.innerHTML += `<p>(${data.username}): ${data.message}</p>`;
});

socket.on("chat:typing", function(data) {
  actions.innerHTML = `<p><em>${data} is typing a message..</em></p>`;
});
