function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    // Get the list to be filtered
    ul = document.getElementById("myUL");
    // Get all list items in the list
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


//filter news
// Get filter button and filter options
const filterButton = document.getElementById('filterButton');
const filterOptions = document.querySelector('.filterOptions');

// Add click event listener to filter button
filterButton.addEventListener('click', () => {
    // Toggle display of filter options
    filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
});




const API_KEY = "f7b176bfe5954c93b7e4b52189b96898";

const baseURL = "https://newsapi.org/v2/everything?q=keyword&apiKey=f7b176bfe5954c93b7e4b52189b96898";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
    const url = `${baseURL}?q=${query}&from=2024-04-12&sortBy=publishedAt&apiKey=${API_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
});











