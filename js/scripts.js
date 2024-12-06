
// funcion para desplegar y ocultar el filtro
function toggleFilter() {
    let filterItems = document.querySelectorAll(".filter-item");
    
    if (filterItems[0].style.display === "grid") {
        filterItems.forEach(function(item) {
            item.style.display = "none";
        });
        document.getElementById("deploy").innerHTML = "<i class='bx bxs-right-arrow'></i>";
    } 
    else {
        filterItems.forEach(function(item) {
            item.style.display = "grid";
        });
        document.getElementById("deploy").innerHTML = "<i class='bx bxs-down-arrow'></i>";
    }
}

document.getElementById("deploy").addEventListener("click", toggleFilter);

// funcion para poner y quitar favoritos
document.querySelector("tbody").addEventListener("click", (event) => {
    const fav = event.target;

    if (fav.classList.contains("fav-icon")) {
        fav.classList.toggle("favorited");

        if (fav.classList.contains("bx-heart")) {
            fav.classList.remove("bx-heart");
            fav.classList.add("bxs-heart");
        } else {
            fav.classList.remove("bxs-heart");
            fav.classList.add("bx-heart");
        }
    }
});

// funcion para filtrar canciones
function selectFilter(event) {
    const filter = event.target.closest(".filter-item");
    if (!filter) return;

    document.querySelectorAll(".filter-item").forEach((item) => {
        item.classList.remove("selected");
    });

    filter.classList.add("selected");

    const filterText = filter.querySelector(".text span").textContent.toLowerCase();

    document.querySelectorAll("tbody tr").forEach((row) => {
        const isFavorited = row.querySelector(".fav-icon").classList.contains("favorited");

        if (filterText === "all") {
            row.classList.remove("hidden");
        } else if (filterText === "favorites") {
            if (isFavorited) {
                row.classList.remove("hidden");
            } else {
                row.classList.add("hidden");
            }
        }
    });
}

document.querySelectorAll(".filter-item").forEach((item) => {
    item.addEventListener("click", selectFilter);
});


const volumeSlider = document.querySelector("#volume");
const volumeIcon = document.querySelector("#volume-i");
const audio = document.querySelector("#audio");

// función para cambiar el volumen
volumeSlider.addEventListener("input", function () {
    audio.volume = volumeSlider.value;

    // cambiar el icono
    if (audio.volume === 0) {
        volumeIcon.classList.remove("bxs-volume-full", "bxs-volume-low", "bxs-volume");
        volumeIcon.classList.add("bxs-volume-mute");  
        
    } else if (audio.volume > 0.9) {
        volumeIcon.classList.remove("bxs-volume-low", "bxs-volume-mute", "bxs-volume");
        volumeIcon.classList.add("bxs-volume-full"); 
    } else {
        volumeIcon.classList.remove("bxs-volume-full", "bxs-volume-mute", "bxs-volume");
        volumeIcon.classList.add("bxs-volume-low");  
    }
});

