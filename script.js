const songs = [
    { id: 1, name: "Song 1", artist: "Artist 1", img: "music.png", genre: "Pop", source: "https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/11/file_example_MP3_700KB.mp3" },
    { id: 2, name: "Song 2", artist: "Artist 2", img: "music1.png", genre: "Rock", source: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3" },
    { id: 3, name: "Song 3", artist: "Artist 3", img: "music2.png", genre: "Jazz", source: "https://samples-files.com/samples/Audio/mp3/sample-file-1.mp3" },
        { id: 4, name: "Song 5", artist: "Artist 4", img: "music3.png", genre: "Rock", source: "https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3" },
            { id: 5, name: "Song 6", artist: "Artist 5", img: "music4.png", genre: "Pop", source: "https://file-examples.com/storage/fe36b23e6a66fc0679c1f86/2017/11/file_example_MP3_700KB.mp3" },


];

let currentSongIndex = 0;
let playlists = {};

function toggleTheme() {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
}

function showSongs(genre = "", searchQuery = "") {
    const songListDiv = document.getElementById("songList");
    songListDiv.innerHTML = ""; 
    let filteredSongs = genre ? songs.filter(song => song.genre === genre) : songs;
    
    if (searchQuery) {
        filteredSongs = filteredSongs.filter(song => song.name.toLowerCase().includes(searchQuery.toLowerCase()) || song.artist.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    filteredSongs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.textContent = song.name + " - " + song.artist;
        songDiv.onclick = () => renderCurrentSong(song);
        songListDiv.appendChild(songDiv);
    });
}

document.getElementById("songType").addEventListener("change", function() {
    const selectedGenre = this.value;
    showSongs(selectedGenre, document.getElementById("searchSong").value);
});

document.getElementById("searchSong").addEventListener("input", function() {
    const searchQuery = this.value;
    showSongs(document.getElementById("songType").value, searchQuery);
});

function renderCurrentSong(song) {
    currentSongIndex = songs.indexOf(song);
    document.getElementById("display-img").src = song.img;
    document.getElementById("audio-player").src = song.source;
    document.getElementById("audio-player").play();
}

document.getElementById("next").addEventListener("click", function() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong(songs[currentSongIndex]);
});

document.getElementById("prev").addEventListener("click", function() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong(songs[currentSongIndex]);
});

document.getElementById("addToPlaylist").addEventListener("click", function() {
    addToPlaylist(songs[currentSongIndex]);
});

function addToPlaylist(song) {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName) {
        if (!playlists[playlistName]) {
            playlists[playlistName] = [];
        }
        playlists[playlistName].push(song);
        updatePlaylistUI();
    }
}

document.getElementById("createPlaylist").addEventListener("click", function() {
    createPlaylist();
});

function createPlaylist() {
    const playlistName = document.getElementById("playlistName").value;
    if (playlistName && !playlists[playlistName]) {
        playlists[playlistName] = [];
        updatePlaylistUI();
    }
}

function updatePlaylistUI() {
    const allPlaylistsDiv = document.getElementById("allPlaylists");
    allPlaylistsDiv.innerHTML = ""; 
    Object.keys(playlists).forEach(playlist => {
        const playlistDiv = document.createElement("div");
        playlistDiv.textContent = playlist;
        playlistDiv.onclick = () => renderPlaylistSongs(playlist);
        allPlaylistsDiv.appendChild(playlistDiv);
    });
}

function renderPlaylistSongs(playlistName) {
    const currentPlaylistDiv = document.getElementById("currentPlaylist");
    currentPlaylistDiv.innerHTML = ""; 
    playlists[playlistName].forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.textContent = song.name + " - " + song.artist;
        songDiv.onclick = () => renderCurrentSong(song);
        currentPlaylistDiv.appendChild(songDiv);
    });
}

document.getElementById("searchPlaylist").addEventListener("input", function() {
    const searchQuery = this.value.toLowerCase();
    const allPlaylistsDiv = document.getElementById("allPlaylists");
    allPlaylistsDiv.innerHTML = ""; 

    Object.keys(playlists)
        .filter(playlist => playlist.toLowerCase().includes(searchQuery))
        .forEach(filteredPlaylist => {
            const playlistDiv = document.createElement("div");
            playlistDiv.textContent = filteredPlaylist;
            playlistDiv.onclick = () => renderPlaylistSongs(filteredPlaylist);
            allPlaylistsDiv.appendChild(playlistDiv);
        });
});

showSongs();
