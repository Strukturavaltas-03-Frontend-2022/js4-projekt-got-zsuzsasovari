let allItems = [];

const gotimport = async (url = '../json/got.json') => {
    try{
        const response = await fetch(url);
        const data = await response.json();
        allItems = data.filter((item) => {
            if(item.hasOwnProperty('dead')){
                return false;
            } 
            return true;
        }).sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error(error);
        return [];
    }
};
await gotimport();

const createAllDiv = () => {
    let flexItem = document.querySelector('.flex-container');
    allItems.forEach((item, index) => {
        let divs = `<div class="flex-items" id="div${index}"><img src="${item.portrait}" alt="pictures"><br>${item.name}</div>`;
        flexItem.insertAdjacentHTML('beforeend', divs);
        let clickedItem = document.querySelector(`#div${index}`);
        clickedItem.addEventListener('click', () =>{
            let selectedDiv = document.querySelector(`#div${index}`);
            selectedDiv.classList.add('clicked');
            biocall(index);
            setTimeout(() => selectedDiv.classList.remove('clicked'), 1000);
        });
    });
};

const biocall = (index) => {
    let person = allItems[index];
    let picture = document.querySelector('.bio-img');
    let name = document.querySelector('.bio-name');
    let house = document.querySelector('.bio-house');
    let description = document.querySelector('.bio-bio');
    picture.src = person.hasOwnProperty('picture') ? person.picture : person.portrait;
    name.innerHTML = person.name;
    let houseImageRoot = './assets/houses/';
    house.src = houseImageRoot + (person.hasOwnProperty('house') ? person.house : 'stark') + '.png';
    description.innerHTML = person.bio;
}

const inputSearch = () => {
    let button = document.querySelector('.search-btn');
    button.addEventListener('click', () => {
        let inputField = document.querySelector('.input');
        let resultIndex = allItems.findIndex(person => person.name.toUpperCase() === inputField.value.toUpperCase());

        if(resultIndex >= 0) {
            biocall(resultIndex);
        } else {
            inputField.value = 'Character not found';
        }
    });
}
const myTimeout = setTimeout(() => {createAllDiv();inputSearch(); biocall(0);}, 200);