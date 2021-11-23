import axios from "axios";
import faker from "faker";

const trainersContainer = document.querySelector("#trainers-container");

const renderTrainers = async () => {
  const trainers = (await axios.get("/api/trainers")).data;
  const header = document.querySelector(".global-container h1");
  header.innerHTML = `Trainers (${trainers.length})`;

  const allTrainers = trainers
    .map((trainer, idx) => {
      const currTrainer = window.location.hash.slice(1) * 1;
      const html = `
        <a href="#${idx}" class="trainer-card ${
        currTrainer === idx ? "selected" : ""
      }">
            <p>Trainer First Name: ${trainer.first_name}</p>
            <p>Trainer Last Name: ${trainer.last_name}</p>
            <ul class="animals"> Animals: ${trainer.animals.map(animal => {
                return `
                <li>${animal.name} (species: ${animal.species})</li>
                `
            }).join('')} </ul>
        </a>
        `;
      return html;
    })
    .join("");

    trainersContainer.innerHTML = allTrainers;
};

const init = async () => {
  renderTrainers();
};

window.addEventListener("hashchange", async () => {
  renderTrainers();
});

init();
