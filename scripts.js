var searchEl = document.getElementById('searchInput');
var searhFormEl = document.getElementById('searchForm');
var searchContainerEl = document.getElementById('SearchContainer');
var cancelEl = document.getElementById('cancelDownload');
var backEl = document.getElementById('backButton');
var SearchButtonsContainerEl = document.getElementById('SearchButtonsContainer');
var timerId;

searhFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    startSearch(searchEl.value);
    history.pushState({}, "searching for " + searchEl.value, document.location.pathname + "?search=" + searchEl.value)

});

cancelEl.addEventListener('click', function () {
    clearInterval(timerId);
});
backEl.addEventListener('click', function () {
    history.back();
    console.log('value',getParams().search);
    searchEl.value = getParams().search;
    setTimeout(function(){
        searchEl.value = getParams().search;
    })
});

function getParams() {
    var tuple = document.location.search.substr(1).split('&');
    var params = {};
    for (var i in tuple) {
        var group = tuple[i].split("=");
        params[group.shift()] = decodeURI(group.join("="));
    }
    return params
}

function startSearch(searchValue) {
    searchContainerEl.style.display = 'block';
    SearchButtonsContainerEl.style.display = 'block';
    var counter = 10;
    searchContainerEl.innerText = " Downloading " + searchValue + " in " + counter;
    if (timerId) {
        clearInterval(timerId);
    }
    timerId = setInterval(function () {
        counter--;
        if (counter < 0) {
            searchContainerEl.innerText = " Downloading " + searchValue;
            clearInterval(timerId)
        } else {
            searchContainerEl.innerText = " Downloading " + searchValue + " in " + counter;
        }

    }, 1000)
}

var searchQuery = getParams().search;
if (searchQuery) {
    startSearch(searchQuery);
    searchEl.value = searchQuery
}