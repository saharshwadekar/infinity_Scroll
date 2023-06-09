const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let requestedImageArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function showLoadingPage()
{
    loader.hidden = false;
}
function removeLoadingPage()
{
    loader.hidden = true;
}

const initialCountImages = 4;
const apiAccessKey = `zmbuK6-ffjI4JIMy2fWU9Xgf8uk5UayxBx3_OQ2gMu4`; 

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiAccessKey}&count=${initialCountImages}`

function helpSetAttribute(htmlTag , attributeDictionary)
{
    for(const key in attributeDictionary)
    {
        htmlTag.setAttribute(key,attributeDictionary[key]);
    }
}

function displayImages() 
{
    showLoadingPage();
    imagesLoaded = 0;
    totalImages = requestedImageArray.length;
    requestedImageArray.forEach((image) => {
        const anchorTag = document.createElement('a');
        helpSetAttribute(anchorTag,
            {
                href: image.links.html,
                target: '_blank'
            })

        const imageTag = document.createElement('img');
        helpSetAttribute(imageTag,
            {
               src: image.urls.regular,
               alt: image.alt_description,
               title: image.alt_description
            })
        imageTag.addEventListener('load' , () =>
        {
            imagesLoaded++;
            if(imagesLoaded === totalImages)
            {
                ready= true;
                initialCountImages = 10;
            }
        })
        anchorTag.appendChild(imageTag);
        imageContainer.appendChild(anchorTag);
    });
    removeLoadingPage();
}

async function getImagesFromAPI()
{
    showLoadingPage();
    try {
        const response = await fetch(apiUrl);
        requestedImageArray = await response.json();
        displayImages();
    } catch (error) {
        
    }
}

getImagesFromAPI();



window.addEventListener('scroll',() => 
{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getImagesFromAPI();
    }
})