// // Fetch adventure data from local JSON file
document.addEventListener("DOMContentLoaded", () => {
    fetch("../assets/data/adventures.json")  // Fetching from local JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error("Error loading JSON data");
            }
            return response.json();
        })
        .then(data => {
            console.log("Loaded Adventures Data:", data);  

            displayAdventures(data);  
            addMapMarkers(data);      

            setupFilters();           // Call filters *after* loading data
            setupSearch();            //  Call search *after* loading data
        })
    


        

});


// Display Adventures
function displayAdventures(adventures) {
    const container = document.getElementById("adventure-cards");
    container.innerHTML = adventures.map(adventure => `
        <div class="card" data-category="${adventure.category}">
            <img src="${adventure.image}" alt="${adventure.title}">
            <h3 class="title">${adventure.title}</h3>
            <p>${adventure.description}</p>
            <p class="story">${adventure.story}</p>
            <button class="read-more">Read More</button>
        </div>
    `).join(""); 

    // Add event listener to each "Read More" button
    document.querySelectorAll(".read-more").forEach(button => {
        button.addEventListener("click", (event) => {
            let card = event.target.closest(".card"); // Get the parent card
            card.classList.toggle("expanded"); // Toggle expanded class

            // Changes button text accordingly
            if (card.classList.contains("expanded")) {
                event.target.textContent = "Show Less";
            } else {
                event.target.textContent = "Read More";
            }
        });
    });
}

// Filter Adventures
function setupFilters() {
    document.querySelectorAll(".filter-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterAdventures(button.dataset.category);
        });
    });
}

function filterAdventures(category) {
    document.querySelectorAll(".card").forEach(card => {
        if (category === "all" || card.dataset.category === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Function to add interactive markers on   the SVG map
const svgMap = document.getElementById("map");
const popup = document.getElementById("popup");
let isMouseOverPopup = false;
let popupTimeout = null;

// Function to add interactive markers on the SVG map
function addMapMarkers(adventures) {
    // Remove existing markers before adding new ones
    document.querySelectorAll(".marker").forEach(marker => marker.remove());

    adventures.forEach(adventure => {
        const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        marker.setAttribute("cx", adventure.location.x);
        marker.setAttribute("cy", adventure.location.y);
        marker.setAttribute("r", 10);
        marker.setAttribute("class", "marker");
        marker.setAttribute("data-title", adventure.title);
        marker.setAttribute("data-description", adventure.description);

        marker.addEventListener("mouseenter", (event) => {
            clearTimeout(popupTimeout);
            showPopup(event, adventure);
        });

        marker.addEventListener("mouseleave", () => {
            popupTimeout = setTimeout(() => {
                if (!isMouseOverPopup) closePopup();
            }, 200);
        });

        marker.addEventListener("click", () => {
            document.querySelectorAll(".marker").forEach(m => m.classList.remove("active"));
            marker.classList.add("active");
        });

        svgMap.appendChild(marker);
    });
}

// Show popup near the marker
function showPopup(event, adventure) {
    popup.style.left = `${event.pageX + 15}px`;
    popup.style.top = `${event.pageY - 30}px`;
    popup.style.display = "block";
    document.getElementById("popup-title").textContent = adventure.title;
    document.getElementById("popup-description").textContent = adventure.description;
}

// Close the popup
function closePopup() {
    popup.style.display = "none";
}

// Hover state tracking
popup.addEventListener("mouseenter", () => {
    isMouseOverPopup = true;
    clearTimeout(popupTimeout);
});

popup.addEventListener("mouseleave", () => {
    isMouseOverPopup = false;
    popupTimeout = setTimeout(() => closePopup(), 200);
});



// Search Functionality with Keyword Highlighting
function setupSearch() {
    const searchBar = document.getElementById("search-bar");
    const noResults = document.getElementById("noResults");

    searchBar.addEventListener("input", function () {
        let searchValue = this.value.toLowerCase();
        let matchCount = 0;

        document.querySelectorAll(".card").forEach(card => {
            let titleElement = card.querySelector(".title")
            let titleText = titleElement.textContent;

            if (titleText.toLowerCase().includes(searchValue)) {
                card.style.display = "block";
                matchCount++;

                // Highlight matched text
                let regex = new RegExp(`(${searchValue})`, "gi");
                titleElement.innerHTML = titleText.replace(regex, `<span class="highlight">$1</span>`);
            } else {
                card.style.display = "none";
                titleElement.innerHTML = titleText; // Reset if no match
            }
        });

        // Show or hide "No results"
        if (matchCount === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    });
}

// Route Planner Script
const map = document.getElementById("custom-map");
const waypointList = document.getElementById("waypoint-list");
let waypoints = JSON.parse(localStorage.getItem("bikeWaypoints")) || [];

function renderWaypoints() {
  // Clear old points
  map.querySelectorAll(".waypoint").forEach(el => el.remove());
  waypointList.innerHTML = "";

  waypoints.forEach((point, index) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", point.x);
    circle.setAttribute("cy", point.y);
    circle.setAttribute("r", 6);
    circle.classList.add("waypoint");
    map.appendChild(circle);

    const li = document.createElement("li");
    li.textContent = `Waypoint ${index + 1}: (${point.x}, ${point.y})`;
    waypointList.appendChild(li);
  });

  localStorage.setItem("bikeWaypoints", JSON.stringify(waypoints));
}

// Handle click to add waypoint  

map.addEventListener("click", function (e) {
    const pt = map.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
  
    const svgP = pt.matrixTransform(map.getScreenCTM().inverse());//translates the screen coordinate into the correct SVG internal coordinate space
  
    waypoints.push({ x: Math.round(svgP.x), y: Math.round(svgP.y) });
    renderWaypoints();
  });

  

// Clear route
document.getElementById("clear-route").addEventListener("click", () => {
  waypoints = [];
  localStorage.removeItem("bikeWaypoints");
  renderWaypoints();
});

// View saved route - show in popup
document.getElementById("view-route").addEventListener("click", () => {
    const popupOverlay = document.getElementById("popup-overlay");
    const popupContent = document.getElementById("popup-content");
  
    if (waypoints.length === 0) {
      popupContent.textContent = "No saved waypoints found.";
    } else {
      popupContent.textContent = waypoints.map((p, i) => `#${i + 1}: (${p.x}, ${p.y})`).join("\n");
    }
  
    popupOverlay.style.display = "flex";
  });
  
  // Close popup
  document.getElementById("popup-close").addEventListener("click", () => {
    document.getElementById("popup-overlay").style.display = "none";
  });
  

//Initial render
renderWaypoints();


//Mobile Menu Toggle
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



