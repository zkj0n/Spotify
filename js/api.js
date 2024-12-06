const API_URL = "http://informatica.iesalbarregas.com:7008/songs/";

const tbody = document.querySelector("tbody");
const imgSong = document.querySelector(".img-song img");

let currentAudio = document.getElementById("audio");
let currentRow = null;
let currentPlayButton = null;

async function fetchSongs() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error al cargar las canciones');
        }
        const songs = await response.json();
        renderSongs(songs);
    } catch (error) {
        console.error('Error:', error);
        tbody.innerHTML = "<tr><td colspan='5'>no se puedo cargar la lista de canciones. inténtalo de nuevo mas tarde.</td></tr>";
    }
}

function renderSongs(songs) {
    tbody.innerHTML = "";

    songs.forEach((song) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <span class="circle-icon" id="${song.id}">
                    <i class="bx bx-play"></i>
                </span>
            </td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td class="duration">loading...</td>
            <td><i class='bx bx-heart fav-icon'></i></td>
        `;

        tbody.appendChild(row);

        const playButton = row.querySelector(".circle-icon");
        const playIcon = playButton.querySelector("i");
        
        playButton.addEventListener("click", function () {
          
            const audio = new Audio(song.filepath); 
            audio.addEventListener("loadedmetadata", () => {
                const duration = formatDuration(audio.duration);
                row.querySelector(".duration").textContent = duration;
            });
            if (currentRow && currentRow !== row) {
                currentPlayButton.querySelector("i").classList.remove("bx-pause");
                currentPlayButton.querySelector("i").classList.add("bx-play");
            }

            if (playIcon.classList.contains("bx-play")) {
                playIcon.classList.remove("bx-play");
                playIcon.classList.add("bx-pause");

                imgSong.src = song.cover;
                imgSong.alt = song.title;
                document.querySelector(".song-title").textContent = song.title;
                

                currentAudio.src = song.filepath;
                currentAudio.play();

                currentAudio.onended = () => {
                    const nextRow = row.nextElementSibling;
                    if (nextRow) {
                        const nextPlayButton = nextRow.querySelector(".circle-icon");
                        nextPlayButton.click();
                    }
                };
            } else {
                playIcon.classList.remove("bx-pause");
                playIcon.classList.add("bx-play");
                currentAudio.pause();
            }

            if (currentRow) {
                currentRow.classList.remove("playing");
            }
            row.classList.add("playing");
            currentRow = row;
            currentPlayButton = playButton;
        });
    });
}

// Formatear duración en mm:ss
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

document.addEventListener("DOMContentLoaded", function () {
    fetchSongs();
});
