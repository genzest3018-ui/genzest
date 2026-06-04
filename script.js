```javascript
/* ==========================================================================
   FIREBASE REAL-TIME INTERFACES SETUP
   ========================================================================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase initialization configuration matrix
const firebaseConfig = {
  apiKey: "AIzaSyAaBBRJWboc_TZ_Tf_e0c3uK0k57l64PP8",
  authDomain: "genzest-85233.firebaseapp.com",
  projectId: "genzest-85233",
  storageBucket: "genzest-85233.firebasestorage.app",
  messagingSenderId: "741928938",
  appId: "1:741928938:web:d55eb961c34732e73e4c93"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ==========================================================================
   BLOG LOADER ENGINE (RETRIEVAL, FILTER, AND SEARCH)
   ========================================================================== */
async function loadBlogs() {
  const blogContainer = document.getElementById("blogContainer");
  if (!blogContainer) return;

  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    blogContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const searchInput = document.getElementById("searchInput");

      // Clean filter bounds logic
      if (
        searchInput &&
        !post.title.toLowerCase().includes(searchInput.value.toLowerCase()) &&
        !post.category.toLowerCase().includes(searchInput.value.toLowerCase())
      ) {
        return;
      }

      blogContainer.innerHTML += `
        <article class="featured-card" data-category="${post.category}">
          <img
            src="${post.image}"
            alt="${post.title}"
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/600x400?text=GENZEST'"
          >
          <div class="featured-content">
            <div class="featured-category">
              ${post.category || "Insights"}
            </div>
            <div class="featured-author">
              ${post.author || "Pulkit & Vansh"}
            </div>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <div class="card-actions" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <a href="blog.html?slug=${post.slug}" class="read-link">
                Read Article
                <i class="fas fa-arrow-right"></i>
              </a>
              <button class="share-btn" onclick="navigator.clipboard.writeText(window.location.origin + '/blog.html?slug=${post.slug}').then(() => { this.textContent = 'Copied!'; setTimeout(() => this.textContent = 'Share', 2000); }).catch(err => console.error('Error copying:', err))">Share</button>
            </div>
          </div>
        </article>
      `;
    });

    // Load static UI category filtering bindings after feed loads
    bindCategoryFilters();

  } catch (error) {
    console.error("Error loading posts from database: ", error);
    blogContainer.innerHTML = "Unable to load insights.";
  }
}

// Category filter bindings logic
function bindCategoryFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    // Purging old listeners by replicating nodes
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      newBtn.classList.add("active");

      const category = newBtn.dataset.category;
      const cards = document.querySelectorAll(".featured-card");

      cards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   NAVIGATION BAR & SLIDEOUT MENU INTERACTION SYSTEM
   ========================================================================== */
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function openSidebar() {
  sidebar.classList.add("active");
  overlay.classList.add("active");
}

function closeSidebar() {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

if (menuBtn) menuBtn.addEventListener("click", openSidebar);
if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
if (overlay) overlay.addEventListener("click", closeSidebar);

/* ==========================================================================
   MULTI-THEME ROTATION INTERFACE SYSTEM
   ========================================================================== */
const themeBtn = document.getElementById("themeToggle");
let currentTheme = 0; // 0: Dark default, 1: Light default, 2: Eye protective default

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    currentTheme++;
    if (currentTheme > 2) {
      currentTheme = 0;
    }

    document.body.classList.remove("theme-light", "theme-eye");

    if (currentTheme === 0) {
      themeBtn.innerHTML = "Theme";
    } else if (currentTheme === 1) {
      document.body.classList.add("theme-light");
      themeBtn.innerHTML = "Light Theme";
    } else if (currentTheme === 2) {
      document.body.classList.add("theme-eye");
      themeBtn.innerHTML = "Eye Care Theme";
    }
  });
}

/* ==========================================================================
   SEO BANNER TEXT TYPING MECHANICS
   ========================================================================== */
const words = ["AI", "Finance", "Investing", "Future", "Business Trends"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (!typingElement) return;

  let currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex++;
      if (wordIndex === words.length) {
        wordIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, deleting ? 60 : 120);
}

/* ==========================================================================
   HERO 3D PARALLAX & PHYSICS PARTICLE GENERATOR LAYER
   ========================================================================== */
function initializeHeroGraphics() {
  const hero = document.getElementById("heroScene");
  const bgGlow = document.getElementById("bgGlow");
  const stage = document.getElementById("visualStage");
  const magneticBtn = document.getElementById("magneticBtn");
  const particlesContainer = document.getElementById("heroParticles");

  /* 1. Kinetic Micro-particles background array */
  if (particlesContainer) {
    particlesContainer.innerHTML = ""; // reset to prevent double appending
    const particleCount = 22;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "hero-particle-dot";
      
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      
      const sizeVal = Math.random() * 3 + 2;
      particle.style.width = sizeVal + "px";
      particle.style.height = sizeVal + "px";
      particle.style.animationDelay = Math.random() * 8 + "s";
      particle.style.animationDuration = Math.random() * 6 + 8 + "s";
      
      particlesContainer.appendChild(particle);
    }
  }

  /* 2. Mouse Parallax and 3D Rotation mechanics */
  if (hero && window.innerWidth > 992) {
    let frameTracking = false;

    hero.addEventListener("mousemove", (e) => {
      if (!frameTracking) {
        window.requestAnimationFrame(() => {
          const boundingBox = hero.getBoundingClientRect();
          const offsetX = e.clientX - boundingBox.left;
          const offsetY = e.clientY - boundingBox.top;
          
          const percentageX = offsetX / boundingBox.width;
          const percentageY = offsetY / boundingBox.height;
          
          const relativeX = percentageX - 0.5;
          const relativeY = percentageY - 0.5;

          // Slide glow
          if (bgGlow) {
            bgGlow.style.transform = `translate(calc(-50% + ${relativeX * 120}px), calc(-50% + ${relativeY * 120}px))`;
          }

          // Dynamic 3D tilt
          if (stage) {
            const pitchRotation = relativeY * -18; 
            const yawRotation = relativeX * 18;   
            stage.style.transform = `rotateX(${pitchRotation}deg) rotateY(${yawRotation}deg)`;
          }
          frameTracking = false;
        });
        frameTracking = true;
      }
    });

    hero.addEventListener("mouseleave", () => {
      if (bgGlow) bgGlow.style.transform = "translate(-50%, -50%)";
      if (stage) stage.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  /* 3. Magnetic Hover Physics on CTA Trigger */
  if (magneticBtn && window.innerWidth > 768) {
    magneticBtn.addEventListener("mousemove", (e) => {
      const coordinates = magneticBtn.getBoundingClientRect();
      const targetX = e.clientX - coordinates.left - coordinates.width / 2;
      const targetY = e.clientY - coordinates.top - coordinates.height / 2;
      magneticBtn.style.transform = `translate(${targetX * 0.35}px, ${targetY * 0.35}px) scale(1.02)`;
    });

    magneticBtn.addEventListener("mouseleave", () => {
      magneticBtn.style.transform = "translate(0px, 0px) scale(1)";
    });
  }
}

/* ==========================================================================
   APPLICATION ENTRY RUNNER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Current Copyright Year Dynamic Loader
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.innerText = new Date().getFullYear();

  // Load database feed
  loadBlogs();

  // Initialize interactive elements
  typeEffect();
  initializeHeroGraphics();

  // Search trigger event listener
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", loadBlogs);
  }
});

```
