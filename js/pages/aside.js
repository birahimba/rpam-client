// ✅ Définis l'URL de ton backend Strapi déployé
const API_BASE_URL = "https://rpam-back.onrender.com";

// Simple sanitization to escape HTML special characters
function sanitize(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// 🔥 Fonction pour afficher les articles populaires
async function fetchAndDisplayPopularPosts() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs?populate=*&sort=publishedAt:desc`
    );
    const data = await response.json();
    const popularPostsContainer = document.getElementById(
      "popular-posts-container"
    );

    if (!popularPostsContainer) {
      console.error(
        "Container 'popular-posts-container' is missing in the HTML."
      );
      return;
    }

    if (data.data && data.data.length > 0) {
      const popularPostsList = document.createElement("ul");
      popularPostsList.classList.add(
        "popular-post-sidebar",
        "position-relative"
      );

      data.data.slice(0, 3).forEach((article) => {
        const attr = article.attributes;
        const listItem = document.createElement("li");
        listItem.classList.add("d-flex", "align-items-center");

        const title = attr?.Title || "Title not available";
        const sanitizedTitle = sanitize(title);
        const publishedDate = attr?.publishedAt || "Date not available";
        const documentId = attr?.documentId || "unknown-document";

        let imageUrl = "https://via.placeholder.com/600x600";
        const media = attr?.media?.data?.[0]?.attributes;
        if (media?.formats?.thumbnail?.url) {
          imageUrl = `${API_BASE_URL}${media.formats.thumbnail.url}`;
        } else if (media?.url) {
          imageUrl = `${API_BASE_URL}${media.url}`;
        }

        listItem.innerHTML = `
          <figure>
            <a href="article.html?documentId=${encodeURIComponent(documentId)}">
              <img src="${sanitize(imageUrl)}" alt="${sanitizedTitle}" loading="lazy" />
            </a>
          </figure>
          <div class="col media-body">
            <a class="fw-600 fs-17 text-dark-gray d-inline-block mb-10px" href="article.html?documentId=${encodeURIComponent(documentId)}"></a>
            <div><a href="blog-grid.html" class="d-inline-block fs-15"></a></div>
          </div>
        `;

        listItem.querySelector(".media-body > a").textContent = title;
        listItem.querySelector(".media-body div a").textContent = new Date(
          publishedDate
        ).toLocaleDateString();

        popularPostsList.appendChild(listItem);
      });

      const popularPostsTitle = document.createElement("div");
      popularPostsTitle.classList.add(
        "fw-600",
        "fs-19",
        "lh-22",
        "ls-minus-05px",
        "text-dark-gray",
        "border-bottom",
        "border-color-dark-gray",
        "border-2",
        "d-block",
        "mb-30px",
        "pb-15px",
        "position-relative"
      );
      popularPostsTitle.textContent = "Popular posts";

      popularPostsContainer.appendChild(popularPostsTitle);
      popularPostsContainer.appendChild(popularPostsList);
    } else {
      popularPostsContainer.innerHTML = "<p>No popular posts available.</p>";
    }
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    const popularPostsContainer = document.getElementById(
      "popular-posts-container"
    );
    if (popularPostsContainer) {
      popularPostsContainer.innerHTML = "<p>Failed to load popular posts.</p>";
    }
  }
}

// 🔥 Fonction pour afficher les thematiques
async function fetchAndDisplayThematiques() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/thematiques`);
    const data = await response.json();
    const categoryListContainer = document.querySelector(
      ".category-list-sidebar"
    );

    if (!categoryListContainer) {
      console.error(
        "Container 'category-list-sidebar' is missing in the HTML."
      );
      return;
    }

    categoryListContainer.innerHTML = "";

    if (data.data && data.data.length > 0) {
      data.data.forEach((thematique) => {
        const title = thematique?.attributes?.Title || "Unknown Thematique";

        const categoryItem = document.createElement("li");
        categoryItem.classList.add(
          "d-flex",
          "align-items-center",
          "h-80px",
          "cover-background",
          "ps-35px",
          "pe-35px"
        );
        categoryItem.style.backgroundImage = `url('https://via.placeholder.com/600x144')`;

        categoryItem.innerHTML = `
          <div class="opacity-medium bg-gradient-dark-transparent"></div>
          <a href="blog-grid.html?thematique=${encodeURIComponent(title)}" class="d-flex align-items-center position-relative w-100 h-100">
            <span class="text-white mb-0 fs-20 fw-500 fancy-text-style-4"></span>
            <span class="btn text-white position-absolute">
              <i class="bi bi-arrow-right ms-0 fs-24"></i>
            </span>
          </a>
        `;

        categoryItem.querySelector("span.text-white").textContent = title;

        categoryListContainer.appendChild(categoryItem);
      });
    } else {
      categoryListContainer.innerHTML = "<p>No thematiques available.</p>";
    }
  } catch (error) {
    console.error("Error fetching thematiques:", error);
    const categoryListContainer = document.querySelector(
      ".category-list-sidebar"
    );
    if (categoryListContainer) {
      categoryListContainer.innerHTML = "<p>Failed to load thematiques.</p>";
    }
  }
}

fetchAndDisplayPopularPosts();
fetchAndDisplayThematiques();
