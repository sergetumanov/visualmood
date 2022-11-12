//1. Finding all the elements and declaring as variables
const searchBox = document.getElementById('searchBox')
const searchButton = document.getElementById('searchButton')
const error = document.getElementById('error')
const author = document.getElementById('author')
const tags = document.getElementById('tags')
const imgTemp = document.getElementById('img_temp')
const display = document.getElementById('video')
const videoSource = document.getElementById('videoSource')


//2. Entering API data. URL and apiKEY for further connection to the app
const baseURL = 'https://pixabay.com/api/videos/'
const apiKey = '29015028-a7979fd134fe67fa3a9954ab5'
let pageNumber = 1
let totalResults

window.addEventListener('load', () => {
    const lastSearch = localStorage.getItem('search')
    if (lastSearch) {
        searchBox.value = lastSearch;
    }
})


//3. Empty field validation and error message
searchButton.addEventListener('click', function (e) {
    if (searchBox.value == "") {
        error.innerHTML = "Please enter something in a search field";
        error.style.display = 'block';
    }
    
    //4. Sending results from the search box
    else {
         //6. Saving search history
        localStorage.setItem('search', searchBox.value)
            loadData();
            error.style.display = 'none';
            imgTemp.style.display = 'none';
            display.style.display = 'block';
    }
})


//5. Function to display the results
async function loadData() {
    const data = await fetch(`${baseURL}?key=${apiKey}&q=${searchBox.value}&page=${pageNumber}`)
        const videos = await data.json();
        totalResults = videos.totalHits;
    for (let i = 0; i < videos.hits.length; i++) {
        videoSource.src = videos.hits[i].videos.large.url;
        author.innerHTML = videos.hits[i].user;
        tags.innerHTML = videos.hits[i].tags;
    }
};