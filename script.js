// 1. Load the sidebar first
document.addEventListener("DOMContentLoaded", () => {
  fetch("sidebar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("sidebar-placeholder").innerHTML = data;
      initializeSidebarLogic(); // ⬅️ Make sure this runs AFTER sidebar loads
    })
    .catch((err) => console.error("Sidebar load error:", err));
});

// 2. All sidebar-related logic goes in here:
function initializeSidebarLogic() {
  // Active page highlight
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".sidebar a");
  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    if (linkPath === currentPath) {
      link.classList.add("active");
    }

    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }

  // Optional: search bar functionality
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const cards = document.querySelectorAll(".album-card");
      cards.forEach((card) => {
        const title = card.dataset.title?.toLowerCase() || "";
        card.style.display = title.includes(query) ? "block" : "none";
      });
    });
  }
}


// dancing cards and music
const playButton = document.querySelector(".play-btn-modern");
const pauseButton = document.querySelector(".pause-btn-modern");
const albumArt = document.querySelector(".album-art-modern");
const albumCards = document.querySelectorAll(".album-card");

let audio = new Audio("sound/missyou.mp3"); // Make sure this matches your <audio> tag path
let isDancing = false;
let spinTimeout;

playButton.addEventListener("click", () => {
  audio.play();
  clearTimeout(spinTimeout); // prevent multiple timers
  albumArt.classList.remove("dance");
  albumArt.classList.add("spin");

  albumCards.forEach((card) => {
    card.classList.remove("dance");
    card.classList.add("spin");
  });

  spinTimeout = setTimeout(() => {
    albumArt.classList.remove("spin");
    albumArt.classList.add("dance");

    albumCards.forEach((card) => {
      card.classList.remove("spin");
      card.classList.add("dance");
    });
  }, 39000); // 39 seconds

  isDancing = true;
});

pauseButton.addEventListener("click", () => {
  audio.pause();
  clearTimeout(spinTimeout);
  albumArt.classList.remove("spin", "dance");

  albumCards.forEach((card) => {
    card.classList.remove("spin", "dance");
  });

  isDancing = false;
});




/*
// 3. Logic for expanding cards (unrelated to sidebar, safe to run on its own)
function toggleDetails(card) {
  if (card.classList.contains("expanded")) {
    card.classList.remove("expanded", "slide-down");
    return;
  }

  document.querySelectorAll(".album-card.expanded").forEach((el) => {
    el.classList.remove("expanded", "slide-down");
  });

  const img = card.querySelector("img");
  img.style.transition = "transform 0.8s ease";
  img.style.transform = "scale(1.05) rotate(360deg)";

  setTimeout(() => {
    card.classList.add("expanded", "slide-down");
    img.style.transform = "";
  }, 800);
}
*/