document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("darkModeToggle");
  
    // Load preference
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      if (toggle) toggle.checked = true;
    }
  
    if (toggle) {
      toggle.addEventListener("change", () => {
        if (toggle.checked) {
          document.body.classList.add("dark-mode");
          localStorage.setItem("theme", "dark");
        } else {
          document.body.classList.remove("dark-mode");
          localStorage.setItem("theme", "light");
        }
      });
    }
  });
  