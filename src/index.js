function query() {
  var input = document.getElementById("userInput").value;
  return input
}

const url =
  "http://127.0.0.1:8000/price?" +
  new URLSearchParams({
    q: query(),
  });

function getPrice() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("answer").innerText = data["answer"];
    })
    .catch((error) => console.log(error));
}


