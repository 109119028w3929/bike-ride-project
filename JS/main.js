document.addEventListener("DOMContentLoaded", () => {
    const adventureAPI = "https://67eb90f2aa794fb3222ab4ea.mockapi.io/api/v1/AdventureData";
    let adventureData = [];

    // Fetch Adventure Data
    fetch(adventureAPI)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            adventureData = data;
            console.log('API Data:', data);

            const adventureCards = data.map(adventure => `
                <div class="card">
                    <img src="${adventure.Image}" alt="${adventure.Title}">
                    <h3>${adventure.Title}</h3>
                    <p>${adventure.Description}</p>
                </div>
            `).join('');
            document.getElementById('adventure-cards').innerHTML = adventureCards;
        })
        .catch(error => {
            console.error('Error loading adventure data:', error);
            alert('Failed to load adventure data. Please check the API.');
        });

    // Rider Stats Simulation
    let distance = 0, elevation = 0, rides = 0;
    const distanceElement = document.getElementById("distance");
    const elevationElement = document.getElementById("elevation");
    const ridesElement = document.getElementById("rides");

    setInterval(() => {
        distance += 5;
        elevation += 50;
        rides += 1;
        distanceElement.textContent = distance;
        elevationElement.textContent = elevation;
        ridesElement.textContent = rides;
    }, 1000);

    // Explore Button Scroll
    const exploreBtn = document.querySelector(".explore-btn");
    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            document.getElementById("adventures").scrollIntoView({ behavior: "smooth" });
        });
    }

    // Search Button Click
    document.getElementById('search-btn').addEventListener('click', () => {
        const searchQuery = document.getElementById('searchBox').value.toLowerCase().trim();
        const resultsContainer = document.getElementById("results-container");

        if (!adventureData.length) {
            resultsContainer.innerHTML = "<p>Data is still loading. Try again in a moment.</p>";
            return;
        }

        if (!searchQuery) {
            resultsContainer.innerHTML = "<p>Please enter a search keyword.</p>";
            return;
        }

        const filteredAdventures = adventureData.filter(adventure =>
            (adventure.Title && adventure.Title.toLowerCase().includes(searchQuery)) ||
            (adventure.Description && adventure.Description.toLowerCase().includes(searchQuery))
        );

        console.log("Filtered Results:", filteredAdventures);
        displayAdventures(filteredAdventures);
    });

    // Display Search Results
    function displayAdventures(adventures) {
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = ""; // Clear previous results

        if (adventures.length === 0) {
            resultsContainer.innerHTML = "<p>No matches found.</p>";
            return;
        }

        resultsContainer.innerHTML = adventures.map(adventure =>
            `<div class="adventure-card">
                <img src="${adventure.Image}" alt="${adventure.Title}" class="adventure-image">
                <h3>${adventure.Title}</h3>
                <p><strong>Location:</strong> ${adventure.Location || "Unknown"}</p>
                <p><strong>Difficulty:</strong> ${adventure.Difficulty || "Unknown"}</p>
                <p><strong>Distance:</strong> ${adventure.distance_km || "N/A"} km</p>
                <p><strong>Duration:</strong> ${adventure.duration_hrs || "N/A"} hrs</p>
                <p>${adventure.Description || "No description available."}</p>
            </div>`
        ).join("");

        document.getElementById("search-results").scrollIntoView({ behavior: "smooth" });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.querySelector("nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            nav.classList.toggle("active");
        });

        // Close menu on nav link click 
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
});
