const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let requestedImageArray = [];

loader.hidden = true;

function showLoadingPage()
{
    loader.hidden = false;
}
function removeLoadingPage()
{
    loader.hidden = true;
}

const initialCountImages = 10;
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
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight)
    {
        getImagesFromAPI();
    }
})