// document.addEventListener("DOMContentLoaded", () => {
    // Nav Toggle
    // const menuToggle = document.getElementById("menu-toggle");
    // const nav = document.querySelector("nav");
    // menuToggle.addEventListener("click", () => {
    //   nav.classList.toggle("active");
    // });
  
    // Form Validation and Submit
    const form = document.getElementById("contact-form");
    const responseText = document.getElementById("form-response");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      validateForm().then(() => {
        responseText.textContent = "Sending...";
        setTimeout(() => {
          fetch("https://67eb90f2aa794fb3222ab4ea.mockapi.io/api/v1/mountainbiking", {
            method: "POST",
            body: JSON.stringify({
              name: form.name.value,
              email: form.email.value,
              subject: form.subject.value,
              message: form.message.value,
            }),
            headers: { "Content-Type": "application/json" },
          })
          .then(() => {
            responseText.textContent = "Message sent successfully!";
            form.reset();
          })
          .catch(() => {
            responseText.textContent = "Something went wrong. Please try again.";
          });
        }, 1000);
      }).catch((err) => {
        responseText.textContent = err;
      });
    });
  
    function validateForm() {
      return new Promise((resolve, reject) => {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");
  
        if (!name.value.trim()) {
          name.setCustomValidity("Please enter your name.");
          reject(name.validationMessage); 
        } else if (!email.validity.valid) {
          email.setCustomValidity("Please enter a valid email.");
          reject(email.validationMessage);
        } else if (!subject.value.trim()) {
          subject.setCustomValidity("Subject is required.");
          reject(subject.validationMessage);
        } else if (!message.value.trim()) {
          message.setCustomValidity("Message cannot be empty.");
          reject(message.validationMessage);
        } else {
          name.setCustomValidity("");
          email.setCustomValidity("");
          subject.setCustomValidity("");
          message.setCustomValidity("");
          resolve();
        }
      });
    }
  
    // Chat Support
    
const chatInput = document.getElementById("chat-input");
const chatBox = document.getElementById("chat-box");

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // s validation block
    if (chatInput.value.trim() === "") {
      chatInput.setCustomValidity("Message can't be empty");
      chatInput.reportValidity(); // Show error in browser
      return; // Stop here if message is empty
    } else {
      chatInput.setCustomValidity(""); // Clear any previous error
    }

    const userMsg = document.createElement("div");
    userMsg.classList.add("bot-msg");
    userMsg.style.background = "#f39c12";
    userMsg.textContent = chatInput.value;
    chatBox.appendChild(userMsg);

    const typing = document.createElement("div");
    typing.classList.add("bot-msg");
    typing.textContent = "Typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      typing.textContent = "Thanks for reaching out. We'll get back soon!";
    }, 1000);

    chatInput.value = "";
  }
});

  
    // Location Marker Click
    const locations = {
      1: {
        name: "Mumbai",
        description: "Explore the coastal charm of Mumbai with scenic bike routes along Marine Drive, guided heritage rides, and city tours."
      },
      2: {
        name: "Bangalore",
        description: "Ride through Bangalore’s lush parks and tech corridors with curated biking trails and weekend adventure getaways."
      },
      3: {
        name: "Manali",
        description: "Nestled in the Himalayas, Manali offers thrilling mountain biking experiences through rugged terrains and breathtaking valleys."
      }
      
    };
    
    const markers = document.querySelectorAll('.marker');
    const details = document.getElementById('location-details');
    
    markers.forEach(marker => {
      marker.addEventListener('click', () => {
        const id = marker.getAttribute('data-location-id');
        const location = locations[id];
    
        details.innerHTML = `<strong>${location.name}</strong><br>${location.description}`;
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
  
