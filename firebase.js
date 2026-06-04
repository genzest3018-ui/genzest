import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* FIREBASE CONFIG */
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

/* BLOG LOADER */
async function loadBlogs() {
  const blogContainer = document.getElementById("blogContainer");
  if (!blogContainer) return;

  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    blogContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      const searchInput = document.getElementById("searchInput");

      if (
        searchInput &&
        !post.title.toLowerCase().includes(searchInput.value.toLowerCase()) &&
        !post.category.toLowerCase().includes(searchInput.value.toLowerCase())
      ) {
        return;
      }

      // Safe clean parameter construction
      const articleUrl = `blog.html?slug=${encodeURIComponent(post.slug || '')}`;

      blogContainer.innerHTML += `
        <article class="featured-card" data-category="${post.category || 'Insights'}">
          <img
            src="${post.image || 'https://via.placeholder.com/600x400?text=GENZEST'}"
            alt="${post.title || 'GENZEST Article'}"
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
            <h3>${post.title || 'Untitled Article'}</h3>
            <p>${post.description || ''}</p>
            
            <div class="card-actions" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <a href="${articleUrl}" class="read-link">
                Read Article
                <i class="fas fa-arrow-right"></i>
              </a>
              
              <button class="share-btn" onclick="event.preventDefault(); event.stopPropagation(); navigator.clipboard.writeText(window.location.origin + '/' + '${articleUrl}').then(() => { this.textContent = 'Copied!'; setTimeout(() => this.textContent = 'Share', 2000); }).catch(err => console.error('Error copying:', err))">Share</button>
            </div>
          </div>
        </article>
      `;
    });
  } catch (error) {
    console.error("Firebase Error:", error);
    blogContainer.innerHTML = "Unable to load insights.";
  }
}

// Global initialization wrappers
loadBlogs();

const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.dataset.category;
    const cards = document.querySelectorAll(".featured-card");

    cards.forEach(card => {
      const cardCategory = card.dataset.category;
      if(category === "all" || cardCategory === category){
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

const searchElement = document.getElementById("searchInput");
if (searchElement) {
  searchElement.addEventListener("input", loadBlogs);
}

/* SIDEBAR HANDLERS */
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn && closeBtn && sidebar && overlay) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  });

  const closeMenu = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
}

/* FOOTER YEAR */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.innerText = new Date().getFullYear();

/* THEME LAYER CHANGE MANAGEMENT */
const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  let currentTheme = 0;
  themeBtn.addEventListener("click", () => {
    currentTheme = (currentTheme + 1) % 3;
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
