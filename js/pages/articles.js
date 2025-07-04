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

        const articleElement = document.createElement("div");
        articleElement.classList.add("col-12", "mb-40px");

        const card = document.createElement("div");
        card.classList.add(
          "card",
          "border-0",
          "no-border-radius",
          "box-shadow-extra-large"
        );
        articleElement.appendChild(card);

        const blogImage = document.createElement("div");
        blogImage.classList.add("blog-image");
        card.appendChild(blogImage);

        const imageLink = document.createElement("a");
        imageLink.href = `article.html?documentId=${documentId}`;
        blogImage.appendChild(imageLink);

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = title;
        img.loading = "lazy";
        imageLink.appendChild(img);

        const categories = document.createElement("div");
        categories.classList.add("blog-categories");
        blogImage.appendChild(categories);

        const categoryLink = document.createElement("a");
        categoryLink.href = "blog-grid.html";
        categoryLink.classList.add(
          "categories-btn",
          "bg-white",
          "text-dark-gray",
          "text-dark-gray-hover",
          "text-uppercase",
          "alt-font",
          "fw-600"
        );
        categoryLink.textContent =
          article?.attributes?.theme?.data?.attributes?.Title || "Category";
        categories.appendChild(categoryLink);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "p-5", "bg-white");
        card.appendChild(cardBody);

        const entryMeta = document.createElement("div");
        entryMeta.classList.add("entry-meta", "mb-20px", "fs-15");
        cardBody.appendChild(entryMeta);

        const span = document.createElement("span");
        entryMeta.appendChild(span);

        const icon = document.createElement("i");
        icon.classList.add("feather", "icon-feather-calendar");
        span.appendChild(icon);

        const dateLink = document.createElement("a");
        dateLink.href = "blog-grid.html";
        dateLink.textContent = new Date(publishedDate).toLocaleDateString();
        span.appendChild(dateLink);

        const titleLink = document.createElement("a");
        titleLink.href = `article.html?documentId=${documentId}`;
        titleLink.classList.add(
          "text-dark-gray",
          "card-title",
          "mb-20px",
          "fw-600",
          "fs-24",
          "d-block"
        );
        titleLink.textContent = title;
        cardBody.appendChild(titleLink);

        const snippetParagraph = document.createElement("p");
        snippetParagraph.classList.add("text-medium-gray", "mb-20px");
        const snippet = content.slice(0, 150);
        const lines = snippet.split("\n");
        lines.forEach((line, index) => {
          snippetParagraph.appendChild(document.createTextNode(line));
          if (index !== lines.length - 1) {
            snippetParagraph.appendChild(document.createElement("br"));
          }
        });
        snippetParagraph.appendChild(document.createTextNode("..."));
        cardBody.appendChild(snippetParagraph);

        const continueLink = document.createElement("a");
        continueLink.href = `article.html?documentId=${documentId}`;
        continueLink.classList.add(
          "btn",
          "btn-link",
          "btn-large",
          "text-base-color",
          "fw-600"
        );
        continueLink.textContent = "Continuer";
        const spanBg = document.createElement("span");
        spanBg.classList.add("bg-base-color");
        continueLink.appendChild(spanBg);
        cardBody.appendChild(continueLink);

        articlesContainer.appendChild(articleElement);
      });
    } else {
      articlesContainer.textContent = "";
      const p = document.createElement("p");
      p.textContent = "No articles found.";
      articlesContainer.appendChild(p);
    }
  } catch (error) {
    console.error("Error fetching articles:", error);
    const articlesContainer = document.getElementById("articles-container");
    if (articlesContainer) {
      articlesContainer.textContent = "";
      const p = document.createElement("p");
      p.textContent = "Failed to load articles.";
      articlesContainer.appendChild(p);
    }
  }
}

// Call the function
fetchAndDisplayArticles();
