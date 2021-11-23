import axios from 'axios'
import faker from 'faker'

const animalsContainer = document.querySelector("#animals-container");

const renderAnimals = async () => {
    const animals = (await axios.get('/api/animals')).data
    const header = document.querySelector('.global-container h1')
    header.innerHTML = `Animals (${animals.length})`

    const allAnimals = animals.map((animal, idx) => {
        const currAnimal = window.location.hash.slice(1) * 1;
        const html = `
        <a data-id="${idx}" href="#${idx}" class="animal-card ${
          currAnimal === idx ? "selected" : ""
        }">
            <p>Animal Type: ${animal.animal_type}</p>
            <p>Sepcies: ${animal.species}</p>
            <p>Name: ${animal.name}</p>
            <p class="trainer"> Trainer: ${animal.trainer.first_name} ${animal.trainer.last_name}</p>
            <form method="POST" action="/api/animals/${animal.id}/?_method=DELETE"><button>X</button></form>
        </a>
        `;
        return html
    }).join('')
    
    animalsContainer.innerHTML = allAnimals
}

const init = async () => {
    renderAnimals();
};

window.addEventListener('hashchange', async() => {
    renderAnimals();
})

animalsContainer.addEventListener('click', async (e) => {
    const id = await e.target.parentElement.parentElement.getAttribute('data-id') * 1
    if (e.target.tagName === 'BUTTON') {
        await axios.delete(`/api/animals/${id}`)
    };
    renderAnimals();
 })



init()