const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {

    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;

    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm));
}

function displayResults(result, searchTerm) {

    resultPlaylist.classList.add("hidden");

    const artistCard = document.querySelector('.artist-card');

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // Limpa os resultados anteriores

    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    filteredArtists.forEach(artist => {

        const clonedArtistCard = artistCard.cloneNode(true);

        // div.card-img > img.artist-img
        clonedArtistCard.children[0].children[0].src = artist.urlImg;
        // div.card-text > a.vst
        clonedArtistCard.children[1].children[0].title = artist.name;
        // div.card-text > span.artist-name
        clonedArtistCard.children[1].children[1].innerHTML = artist.name;

        gridContainer.appendChild(clonedArtistCard);
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {

    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
})