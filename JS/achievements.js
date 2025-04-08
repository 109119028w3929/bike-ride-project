// Scroll-triggered animation for timeline items
document.addEventListener("DOMContentLoaded", function() {
    const timelineItems = document.querySelectorAll(".timeline-item");
   

    const observer = new IntersectionObserver(entries => {
        // Created an IntersectionObserver to detect when elements enter the viewport
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains("visible")) {
                // If the element is visible and does not already have the "visible" class
                entry.target.classList.add("visible");
                // Adds the "visible" class to trigger the CSS animation
            }
        });
    }, {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Adjusts bottom margin for earlier trigger
    });

    // Observes each timeline item
    timelineItems.forEach(item => observer.observe(item));
});

// Awards Intersection Observer
const awards = document.querySelectorAll(".award");
// Select all elements with class "award"

const awardsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // If the award element is in view
            entry.target.classList.add("active");
            // Adds the "active" class to trigger award animation
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% of the award element is visible
});

// Observe each award item
awards.forEach(award => awardsObserver.observe(award));

// Animate progress bars
const progressBars = document.querySelectorAll(".progress-bar-fill");
// Selects all progress bar fill elements

function fillProgressBars() {
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute("data-progress");
        // Get the progress percentage from the data-progress attribute
        bar.style.width = percentage + "%";
        // Set the width of the bar according to the percentage
    });
}

// Animate personal best statistics (like ride distance, speed, elevation)
function animateStat(id, target) {
    let count = 0; // Start the counter from 0
    let speed = 50; // Sets the speed of counting animation (in milliseconds)

    const interval = setInterval(() => {
        if (count < target) {
            count++;
            // Increment the count
            document.getElementById(id).innerText = count;
            // Update the element's inner text with the current count
        } else {
            clearInterval(interval);
            // Stop the interval when the target number is reached
        }
    }, speed);
}

// Start animations when the window finishes loading
window.onload = function() {
    fillProgressBars(); // Fill all progress bars
    animateStat("longestRide", 500); // Animate stat for longest ride
    animateStat("fastestSpeed", 120); // Animate stat for fastest speed
    animateStat("highestElevation", 4500); // Animate stat for highest elevation
};


//Bike quiz
document.addEventListener('DOMContentLoaded', () => {
    const questions = [
      {
        question: "How often do you go on bike rides?",
        options: ["Daily", "Weekends", "Occasionally", "Rarely"],
        answer: "Daily"
      },
      {
        question: "What's your preferred terrain?",
        options: ["Mountains", "City Roads", "Trails", "Beachside"],
        answer: "Trails"
      },
      {
        question: "How do you prepare for a ride?",
        options: ["Check tires", "Pack tools", "Hydrate", "All of the above"],
        answer: "All of the above"
      }
    ];
  
    const quizContainer = document.getElementById("quiz-container");
    const resultBox = document.getElementById("quiz-result");
    let score = 0;
  
    questions.forEach((q, index) => { //for loop used
      const qDiv = document.createElement("div");
      qDiv.classList.add("question");
  
      const qText = document.createElement("h3");
      qText.textContent = `${index + 1}. ${q.question}`;
      qDiv.appendChild(qText);
  
      q.options.forEach(opt => {
        const optBtn = document.createElement("div");
        optBtn.classList.add("option");
        optBtn.textContent = opt;
  
        optBtn.addEventListener("click", () => {
          if (opt === q.answer) {
            optBtn.classList.add("correct");
            score++;
          } else {
            optBtn.classList.add("wrong");
          }
  
          // Disable all options
          qDiv.querySelectorAll(".option").forEach(btn => {
            btn.style.pointerEvents = "none";
            if (btn.textContent === q.answer) {
              btn.classList.add("correct");
            }
          });
  
          // Show result if last question
          if (index === questions.length - 1) {
            setTimeout(() => {
              resultBox.classList.remove("hidden");
              resultBox.textContent = `🎉 You scored ${score} out of ${questions.length}!`;
            }, 1000);
          }
        });
  
        qDiv.appendChild(optBtn);
      });
  
      quizContainer.appendChild(qDiv);
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
          console.log("working");
      });

      // Close menu on nav link click 
      nav.querySelectorAll("a").forEach(link => {
          link.addEventListener("click", () => {
              nav.classList.remove("active");
              menuToggle.setAttribute("aria-expanded", "false");

          });
      });
  }

