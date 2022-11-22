import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgeL8p-OoshNCy8yXw-3Fa_as8qHQbRRM",
  authDomain: "chmc-ai.firebaseapp.com",
  projectId: "chmc-ai",
  storageBucket: "chmc-ai.appspot.com",
  messagingSenderId: "1026185570462",
  appId: "1:1026185570462:web:2950794135dd1d7c6db38f",
  measurementId: "G-WHJZJJEDKR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getPrice() {
  let loader = `<div class="loader-container"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`;
  document.getElementById("answer").innerHTML = loader;
  const url =
    "http://127.0.0.1:8000/price?" +
    new URLSearchParams({
      q: input.value,
    });
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("answer").innerText = `$${data["answer"].replace(
        "$",
        ""
      )}`;
      document.getElementById("answer").style.color = "#16ABE3";
    })
    .catch((error) => console.log(error));
}

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
        const docRef = addDoc(collection(db, "user-queries"), {
          query: input.value,
          response: data,
          time: timestamp,
        });
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
