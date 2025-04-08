// Upload & Save Photo using localStorage
function uploadPhoto() {
    const fileInput = document.getElementById('photoUpload');
    const file = fileInput.files[0];

    // Check if file is selected and is an image
  if (!file || !file.type.startsWith("image/")) {
    alert(" File not supported! Please upload an image file (JPG, PNG, etc.)");
    fileInput.value = ""; // Reset the input
    return;
  }

    const reader = new FileReader();
  
    reader.onload = function(e) {
      const base64 = e.target.result;
      const stored = JSON.parse(localStorage.getItem("galleryPhotos")) || [];
      stored.push(base64);
      localStorage.setItem("galleryPhotos", JSON.stringify(stored));
      displayPhotos();
    };
  
    if (file) reader.readAsDataURL(file);
  }
  
  // Display Photos from localStorage
  function displayPhotos() {
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = "";
    const photos = JSON.parse(localStorage.getItem("galleryPhotos")) || [];
  
    photos.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = "Uploaded photo";
      img.classList.add("gallery-image");
      img.addEventListener('click', () => openLightbox(src));
      grid.appendChild(img);
    });
  }

  //clear storage

  function clearGallery() {
    localStorage.removeItem("galleryPhotos"); // Remove from localStorage
    document.getElementById('photoGrid').innerHTML = ""; // Clear the grid
}

  
  // Lightbox
  function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "flex";
    lightboxImg.src = src;
  }
  
  document.querySelector(".close-lightbox").onclick = () => {
    document.getElementById("lightbox").style.display = "none";
  };
  
  window.onload = () => {
    displayPhotos();
  };


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


