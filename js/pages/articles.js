// Function to fetch and display articles from the API
async function fetchAndDisplayArticles() {
  try {
    // Fetch articles from the Strapi API
    const response = await fetch(
      "http://localhost:1337/api/blogs?populate=*&sort=publishedAt:desc"
    );
    const data = await response.json();

    // Get the container for main articles
    const articlesContainer = document.getElementById("articles-container");

    // Ensure the container exists in the DOM
    if (!articlesContainer) {
      console.error("Container 'articles-container' is missing in the HTML.");
      return;
    }

    // Check if the API returned articles
    if (data.data && data.data.length > 0) {
      // Display main articles
      data.data.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("col-12", "mb-40px");

        // Extract details with fallback values for missing data
        const title = article?.Title || "Title not available";
        const content = article?.content || "Content not available";
        const publishedDate = article?.publishedAt || "Date not available";
        const documentId = article?.documentId || "unknown-document";

        // Get the main image URL or use a placeholder
        let imageUrl = "https://via.placeholder.com/800x570";
        if (article?.media?.[0]?.formats) {
          const mediaFormats = article.media[0].formats;
          imageUrl = mediaFormats.large
            ? `http://localhost:1337${mediaFormats.large.url}`
            : `http://localhost:1337${article.media[0].url}`;
        }

        // Build the HTML for each article
        articleElement.innerHTML = `
          <div class="card border-0 no-border-radius box-shadow-extra-large">
            <div class="blog-image">
              <a href="article.html?documentId=${documentId}">
                <img src="${imageUrl}" alt="${title}" loading="lazy" />
              </a>
              <div class="blog-categories">
                <a href="blog-grid.html" class="categories-btn bg-white text-dark-gray text-dark-gray-hover text-uppercase alt-font fw-600">
                  ${article?.theme?.Title || "Category"}
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

        // Append the article to the container
        articlesContainer.appendChild(articleElement);
      });
    } else {
      // If no articles are found, display a message
      articlesContainer.innerHTML = "<p>No articles found.</p>";
    }
  } catch (error) {
    // Handle any errors during the fetch process
    console.error("Error fetching articles:", error);
    if (articlesContainer) {
      articlesContainer.innerHTML = "<p>Failed to load articles.</p>";
    }
  }
}

// Call the function to fetch and display articles
fetchAndDisplayArticles();
