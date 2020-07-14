const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []

let count = 5;
const apiKey = 'XmEPHtMbZbf06x_-aCOdtiGarE7fEiRJldp-OdbdH4Q';
let apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`

function imageLoaded() {
    console.log('images loaded');
    ++imagesLoaded;
    console.log(imagesLoaded)
    console.log(totalImages)
    if (imagesLoaded === totalImages) {
        ready = true;
        imagesLoaded = 0
        loader.hidden = true
        console.log(ready)
        count = 30
        apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`
    }
}

function setAtributtes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}


function displayRandomPhotos() {
    totalImages = photosArray.length;
    console.log('totalImages', totalImages)
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAtributtes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        const img = document.createElement('img');
        setAtributtes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


async function getRandomPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayRandomPhotos()
    } catch (error) {

    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - 1000) && ready) {
        ready = false;
        getRandomPhotos()
    }
})

getRandomPhotos()

