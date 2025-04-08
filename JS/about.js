// Auto-Sliding Carousel
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");

    if (track) {
        const images = track.innerHTML; // Get original images
        track.innerHTML += images; // Duplicate images for infinite effect
    let scrollAmount = 0;
    const scrollSpeed = 5; // Adjust speed (higher = faster)
    
    function autoSlide() {
        scrollAmount -= scrollSpeed;
        track.style.transform = `translateX(${scrollAmount}px)`;
        
        // Reset when images move fully left
        if (Math.abs(scrollAmount) >= track.scrollWidth / 2) {
            scrollAmount = 0;
        }
    }

    setInterval(autoSlide, 50); // Adjust interval for smoothness
}
});

// FAQ Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.querySelector(".faq-question").addEventListener("click", function () {
            // Close other open items
            faqItems.forEach(el => {
                if (el !== item) el.classList.remove("open");
            });

            // Toggle the clicked item
            item.classList.toggle("open");
        });
    });
});


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
