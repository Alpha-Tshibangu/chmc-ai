var input = document.getElementById("userInput");
var button = document.getElementById("hd-button-container");

function getAnswer() {
  if (input.value.includes("Hey HotDoc")) {
    let loader = `<div class="container"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`;
    document.getElementById("answer").innerHTML = loader;
    const url =
      "http://1.tcp.au.ngrok.io:26052/hd?" +
      new URLSearchParams({
        query: input.value,
      });
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById(
          "answer"
        ).innerText = `Almost done booking your ${
          data["type"]
        } appointment with Dr ${
          data["doctor"].replace(".", "").charAt(0).toUpperCase() +
          data["doctor"].slice(1)
        }. Click "Book Appointment" below to continue.`;
        button.innerHTML = `<a id="hd-button" target=”_blank” class="hotdoc-widget" style="text-decoration: none; color: white" href="${data["link"]}">Book Appointment</a>`;
        document.getElementById("answer").style.color = "#16ABE3";
      })
      .catch((error) => console.log(error));
  } else {
    let loader = `<div class="container"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`;
    document.getElementById("answer").innerHTML = loader;
    const url =
      "http://1.tcp.au.ngrok.io:26052/query?" +
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
      })
      .catch((error) => console.log(error));
  }
}

// Words fading stuff

function fade() {
  var words = [
      "What would you like to know?",
      "Book an appointment with the key-phrase 'Hey HotDoc'.",
      `"Hey HotDoc, Book a standard appointment with Dr Eugene at 12pm next Wednesday."`,
      "How much does an iron infusion cost?",
      "When did the Chisholm Medical Centre begin operations?",
      "Where is the Chisholm Medical Centre located?",
      "Does the Chisholm Medical Centre bulk bill? (Yes!)",
    ],
    i = 0;
  setInterval(function () {
    $("#words").fadeOut(function () {
      $(this)
        .html(words[(i = (i + 1) % words.length)])
        .fadeIn();
    });
  }, 5000);
}

// Modal Stuff

const modal = document.getElementById("modal");
const btnSkip = document.getElementById("modal-skip");
const btn = document.getElementById("hd-button");
const txt = document.getElementById("answer");

window.onload = (event) => {
  setTimeout(() => {
    modal.classList.add("modal-visible");
  }, 1750);
  setTimeout(() => {
    btn.style.visibility = "hidden";
  }, 1550);
};

//tap outside overlay or on cancel button to close window

btnSkip.addEventListener("click", () => {
  modal.classList.remove("modal-visible");
  setTimeout(() => {
    btn.style.visibility = "visible";
    fade();
    txt.setAttribute("answer");
  }, 150);
});
