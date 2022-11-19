function query() {
  var input = document.getElementById("userInput").value;
  return input
}

var input = document.getElementById("userInput")

function getPrice() {
  let loader = `<div class="loader-container"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`;
  document.getElementById('answer').innerHTML = loader;
  const url =
  "http://127.0.0.1:8000/price?" +
  new URLSearchParams({
    q: input.value,
  });
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("answer").innerText = `$${data["answer"].replace("$", "")}`;
      document.getElementById("answer").style.color = "#16ABE3";
    })
    .catch((error) => console.log(error));
}
