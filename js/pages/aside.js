// Function to fetch and display popular posts
async function fetchAndDisplayPopularPosts() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/blogs?populate=*&sort=publishedAt:desc"
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
        const listItem = document.createElement("li");
        listItem.classList.add("d-flex", "align-items-center");

        const title = article?.Title || "Title not available";
        const publishedDate = article?.publishedAt || "Date not available";
        const documentId = article?.documentId || "unknown-document";

        let imageUrl = "https://via.placeholder.com/600x600";
        if (article?.media?.[0]?.formats) {
          const mediaFormats = article.media[0].formats;
          imageUrl = mediaFormats.thumbnail
            ? `http://localhost:1337${mediaFormats.thumbnail.url}`
            : `http://localhost:1337${article.media[0].url}`;
        }

        listItem.innerHTML = `
          <figure>
            <a href="article.html?documentId=${documentId}">
              <img src="${imageUrl}" alt="${title}" loading="lazy" />
            </a>
          </figure>
          <div class="col media-body">
            <a href="article.html?documentId=${documentId}" class="fw-600 fs-17 text-dark-gray d-inline-block mb-10px">${title}</a>
            <div><a href="blog-grid.html" class="d-inline-block fs-15">${new Date(
              publishedDate
            ).toLocaleDateString()}</a></div>
          </div>
        `;

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

// Function to fetch and display thematiques in "Explore category"
async function fetchAndDisplayThematiques() {
  try {
    const response = await fetch("http://localhost:1337/api/thematiques");
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

    // Clear any existing content in the category list
    categoryListContainer.innerHTML = "";

    if (data.data && data.data.length > 0) {
      data.data.forEach((thematique) => {
        const title = thematique?.Title || "Unknown Thematique";

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
          <a href="blog-grid.html?thematique=${title}" 
             class="d-flex align-items-center position-relative w-100 h-100">
            <span class="text-white mb-0 fs-20 fw-500 fancy-text-style-4">${title}</span>
            <span class="btn text-white position-absolute">
              <i class="bi bi-arrow-right ms-0 fs-24"></i>
            </span>
          </a>
        `;

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

// Call the functions to fetch and display popular posts and thematiques
fetchAndDisplayPopularPosts();
fetchAndDisplayThematiques();
