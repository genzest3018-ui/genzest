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
                  <button class="share-btn" onclick="navigator.clipboard.writeText(window.location.origin + '/blog.html?slug=${post.slug}').then(() => { this.textContent = 'Copied!'; setTimeout(() => this.textContent = 'Share', 2000); }).catch(err => console.error('Error copying:', err))">Share</button>
                 </div>
                </a>
              </div>
            </article>
          `;
        });
      } catch (error) {
        console.error(error);
        blogContainer.innerHTML = "Unable to load insights.";
      }
    }

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
    document
  .getElementById("searchInput")
  .addEventListener("input", loadBlogs);

    /* SIDEBAR */
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

    menuBtn.addEventListener("click", openSidebar);
    closeBtn.addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    /* YEAR */
    document.getElementById("year").innerText = new Date().getFullYear();

    /* THEME */
    const themeBtn = document.getElementById("themeToggle");
    let currentTheme = 0;

    themeBtn.addEventListener("click", () => {
      currentTheme++;

      if (currentTheme > 2) {
        currentTheme = 0;
      }

      document.body.classList.remove("theme-light", "theme-eye");

      if (currentTheme === 0) {
        themeBtn.innerHTML = "Theme";
      }

      if (currentTheme === 1) {
        document.body.classList.add("theme-light");
        themeBtn.innerHTML = "Light Theme";
      }

      if (currentTheme === 2) {
        document.body.classList.add("theme-eye");
        themeBtn.innerHTML = "Eye Care Theme";
      }
    });
