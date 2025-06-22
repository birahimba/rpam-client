const API_BASE_URL = "https://rpam-back.onrender.com";

// Function to fetch and display articles from the API
async function fetchAndDisplayArticles() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs?populate=*&sort=publishedAt:desc`
    );
    const data = await response.json();

    const articlesContainer = document.getElementById("articles-container");
    if (!articlesContainer) {
      console.error("Container 'articles-container' is missing in the HTML.");
      return;
    }

    if (data.data && data.data.length > 0) {
      data.data.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("col-12", "mb-40px");

        const title = article?.attributes?.Title || "Title not available";
        const content = article?.attributes?.content || "Content not available";
        const publishedDate =
          article?.attributes?.publishedAt || "Date not available";
        const documentId = article?.id || "unknown-document";

        // Handle image (if media is defined)
        let imageUrl = "https://via.placeholder.com/800x570";
        const media = article?.attributes?.media?.data?.[0];
        if (media?.attributes?.formats) {
          const formats = media.attributes.formats;
          imageUrl = formats.large
            ? `${API_BASE_URL}${formats.large.url}`
            : `${API_BASE_URL}${media.attributes.url}`;
        }

        articleElement.innerHTML = `
          <div class="card border-0 no-border-radius box-shadow-extra-large">
            <div class="blog-image">
              <a href="article.html?documentId=${documentId}">
                <img src="${imageUrl}" alt="${title}" loading="lazy" />
              </a>
              <div class="blog-categories">
                <a href="blog-grid.html" class="categories-btn bg-white text-dark-gray text-dark-gray-hover text-uppercase alt-font fw-600">
                  ${
                    article?.attributes?.theme?.data?.attributes?.Title ||
                    "Category"
                  }
                </a>
              </div>
            </div>
            <div class="card-body p-5 bg-white">
              <div class="entry-meta mb-20px fs-15">
                <span>
                  <i class="feather icon-feather-calendar"></i>
                  <a href="blog-grid.html">${new Date(
                    publishedDate
                  ).toLocaleDateString()}</a>
                </span>
              </div>
              <a href="article.html?documentId=${documentId}" class="text-dark-gray card-title mb-20px fw-600 fs-24 d-block">${title}</a>
              <p class="text-medium-gray mb-20px">${content
                .replace(/\n/g, "<br>")
                .slice(0, 150)}...</p>
              <a href="article.html?documentId=${documentId}" class="btn btn-link btn-large text-base-color fw-600">
                Continuer<span class="bg-base-color"></span>
              </a>
            </div>
          </div>
        `;

        articlesContainer.appendChild(articleElement);
      });
    } else {
      articlesContainer.innerHTML = "<p>No articles found.</p>";
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    const articlesContainer = document.getElementById("articles-container");
    if (articlesContainer) {
      articlesContainer.innerHTML = "<p>Failed to load articles.</p>";
    }
  }
}

// Call the function
fetchAndDisplayArticles();
