console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener("DOMContentLoaded", main)

function main(event){

    fetch(imgUrl)
        .then(response => response.json())
        .then(json => displayPics(json));
    fetchBreeds()
    let breedSelector = document.getElementById("breed-dropdown")
    breedSelector.addEventListener('change', filterBreeds)
};

function fetchBreeds(letter){
    fetch(breedUrl)
        .then(response => response.json())
        .then(json => listBreeds(json, letter));

};

function displayPics(json){
    let dogHouse = document.getElementById('dog-image-container')

    json.message.forEach(dogPic => {
        pic = makePic(dogPic);
        dogHouse.appendChild(pic);
    });

};

function makePic(imgURL){
    let pic = document.createElement('img')
    pic.setAttribute('src', imgURL)
    pic.setAttribute('class', 'dogPic')
    return pic
};

function listBreeds(json, letter){
    // for each breed, call createName
    let ul = document.getElementById('dog-breeds')

    let breedArray = Object.keys(json.message)

    breedArray.forEach(breed => {
        let types = json.message[breed]
        let names = createName(breed, types);
        names.forEach(name => {
            if(!letter || letter == name.charAt(0)){
                let li = document.createElement('li')
                li.textContent = name
                li.setAttribute('class', 'breed')
                li.addEventListener('click', changeColor)
                ul.appendChild(li)
            };
        })
    })
};


function createName(breed, types){
    let names = [];

    if(types.length == 0){
        names.push(breed);

    } else {
        types.forEach(type => {
            let name = type + ' ' + breed
            names.push(name)
        })
    };
    return names
    // returns an array of all the names for this breed
};

function changeColor(event){
    event.target.style.color = "#EE00C0"
};

function filterBreeds(event){
    let ul = document.getElementById('dog-breeds')
    console.log(ul)
    while(ul.firstChild){
        ul.removeChild(ul.firstChild)
    }

    let letter = event.target.value
    console.log(letter)
    fetchBreeds(letter)

};













