// ========================================
// ANIME DATABASE
// ========================================


const animeData = {

    "one-piece": {
        title: "One Piece",
        rating: "8.9/10",
        audio: "Tamil",
        description:
            "One Piece follows Monkey D. Luffy and his crew on their adventure to find the legendary One Piece.",
        poster:
            "https://image.tmdb.org/t/p/original/uiIB9ctqZFbfRXXimtpmZb5dusi.jpg",

        episodes: [
            { number: 1, title: "Episode 1", url: "#" },
            { number: 2, title: "Episode 2", url: "#" },
            { number: 3, title: "Episode 3", url: "#" }
        ]
    },


    "naruto": {
        title: "Naruto",
        rating: "8.7/10",
        audio: "Tamil",
        description:
            "Naruto follows a young ninja who dreams of becoming the strongest leader of his village.",
        poster:
            "https://image.tmdb.org/t/p/original/xppeysfvDKVx775MFuH8Z9BlpMk.jpg",

        episodes: [
            { number: 1, title: "Episode 1", url: "#" },
            { number: 2, title: "Episode 2", url: "#" },
            { number: 3, title: "Episode 3", url: "#" }
        ]
    },


    "jujutsu-kaisen": {
        title: "Jujutsu Kaisen",
        rating: "8.6/10",
        audio: "Tamil",
        description:
            "Jujutsu Kaisen follows Yuji Itadori as he becomes involved in the dangerous world of cursed spirits.",
        poster:
            "https://image.tmdb.org/t/p/original/6qQzMJG27XOJsyAEEIisoJB45j2.jpg",

        episodes: [
            { number: 1, title: "Episode 1", url: "#" },
            { number: 2, title: "Episode 2", url: "#" },
            { number: 3, title: "Episode 3", url: "#" }
        ]
    }

};


// ========================================
// THEME TOGGLE
// ========================================

const themeToggle =
    document.getElementById("themeToggle");


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        themeToggle.textContent =
            isLight ? "☀️" : "🌙";

        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
        );

    });


    // Load saved theme

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        themeToggle.textContent = "☀️";

    }

}


// ========================================
// ANIME DETAILS PAGE
// ========================================

const animeTitle =
    document.getElementById("animeTitle");


if (animeTitle) {

    const params =
        new URLSearchParams(window.location.search);

    const animeId =
        params.get("anime");

    const anime =
        animeData[animeId];


    if (anime) {

        document.title =
            `${anime.title} | AnimeNetworkTamil`;


        document.getElementById("animeTitle")
            .textContent = anime.title;


        document.getElementById("animeRating")
            .textContent =
            `⭐ Rating: ${anime.rating}`;


        document.getElementById("animeAudio")
            .textContent =
            `🎙️ Audio: ${anime.audio}`;


        document.getElementById("animeDescription")
            .textContent =
            anime.description;


        const poster =
            document.getElementById("animePoster");

        poster.src = anime.poster;

        poster.alt = anime.title;
        // ========================================
// EPISODES
// ========================================

const episodeList =
    document.getElementById("episodeList");


if (episodeList && anime.episodes) {

    anime.episodes.forEach(episode => {

        const episodeItem =
            document.createElement("div");

        episodeItem.className =
            "episode-item";


        episodeItem.innerHTML = `
            <div class="episode-info">
                <span>Episode ${episode.number}</span>
                <strong>${episode.title}</strong>
            </div>

            <a
                href="${episode.url}"
                class="episode-watch"
            >
                ▶ Watch
            </a>
        `;


        episodeList.appendChild(
            episodeItem
        );

    });

}


        document
            .getElementById("watchButton")
            .addEventListener("click", () => {

                alert(
                    `${anime.title} player will be added soon!`
                );

            });

    }

    else {

        document.getElementById("animeTitle")
            .textContent =
            "Anime Not Found";

        document.getElementById("animeDescription")
            .textContent =
            "The anime you're looking for doesn't exist.";

    }

}
// ========================================
// SEARCH + GENRE FILTER
// ========================================

const searchInput =
    document.getElementById("animeSearch");

const genreButtons =
    document.querySelectorAll(".genre-btn");

const animeCards =
    document.querySelectorAll(".anime-card");


let selectedGenre = "all";


function filterAnime() {

    const searchText =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    animeCards.forEach(card => {

        const title =
            card.dataset.title || "";

        const genres =
            card.dataset.genres || "";


        const matchesSearch =
            title.includes(searchText);


        const matchesGenre =
            selectedGenre === "all" ||
            genres.includes(selectedGenre);


        card.style.display =
            matchesSearch && matchesGenre
                ? ""
                : "none";

    });

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterAnime
    );

}


genreButtons.forEach(button => {

    button.addEventListener("click", () => {

        genreButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedGenre =
            button.dataset.genre;

        filterAnime();

    });

});
