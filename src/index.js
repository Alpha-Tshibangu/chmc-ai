url = "https://jsonplaceholder.typicode.com/todos/1";

var query = document.getElementById("userInput").value;

const serverUrl =
  "http://127.0.0.1:8000/fees?" +
  new URLSearchParams({
    q: query,
  });

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("answer").innerText = data["title"];
  })
  .catch((error) => console.log(error));

var query = document.getElementById("userInput").value;
