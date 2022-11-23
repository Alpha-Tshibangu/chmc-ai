var input = document.getElementById("userInput");

function getAnswer() {
  if (input.value.includes("Hey HotDoc")) {
    let loader = `<div class="container"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`;
    document.getElementById("answer").innerHTML = loader;
    const url =
      "http://127.0.0.1:8000/hd?" +
      new URLSearchParams({
        query: input.value,
      });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(
          "answer"
        ).innerHTML = `<p id="answer" class="loader-container">Almost done booking your ${data["type"]} appointment with Dr ${data["doctor"]}. Click "Book Appointment" below to continue.</p>`;
        document.getElementById(
          "hd-button-container"
        ).innerHTML = `<a id="hd-button" target=”_blank” class="hotdoc-widget" style="text-decoration: none; color: white" href="${data["link"]}">Book Appointment</a>`;
        document.getElementById("answer").style.color = "#16ABE3";
      })
      .catch((error) => console.log(error));
  } else {
    let loader = `<div class="container"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`;
    document.getElementById("answer").innerHTML = loader;
    const url =
      "http://127.0.0.1:8000/query?" +
      new URLSearchParams({
        q: input.value,
      });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("answer").innerText = `${
          data["answer"].replace(".", "").charAt(0).toUpperCase() +
          data["answer"].slice(1)
        }.`;
        document.getElementById("answer").style.color = "#16ABE3";
        const docRef = addDoc(collection(db, "user-queries"), {
          query: input.value,
          response: data["answer"],
          time: timestamp,
        });
      })
      .catch((error) => console.log(error));
  }
}
