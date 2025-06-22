// ✅ Définis l'URL de ton backend Strapi en ligne
const API_BASE_URL = "https://rpam-back.onrender.com"; // remplace par ton URL exacte

// Récupère le documentId depuis l'URL
function getDocumentIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("documentId");
}

function formatFirstLetter(htmlContent) {
  if (!htmlContent || htmlContent.length === 0) return htmlContent;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const firstParagraph = doc.body.querySelector("p") || doc.body.firstChild;

  if (firstParagraph) {
    const textContent = firstParagraph.textContent || "";
    if (textContent.length > 0) {
      const firstLetter = textContent[0];
      const restOfText = textContent.slice(1);
      firstParagraph.innerHTML = `<span class="alt-font first-letter text-dark-gray">${firstLetter}</span>${restOfText}`;
    }
  }

  const blockquotes = doc.body.querySelectorAll("blockquote");
  blockquotes.forEach((blockquote) => {
    blockquote.classList.add("styled-blockquote");
  });

  return doc.body.innerHTML;
}

async function handleLike(commentId, likeCountElement) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: { like: { $increment: 1 } },
      }),
    });

    if (response.ok) {
      const updatedComment = await response.json();
      likeCountElement.textContent = `${updatedComment.data.attributes.like} Likes`;
    } else {
      alert("Error: Unable to like this comment. Please try again later.");
    }
  } catch (error) {
    console.error("Error liking comment:", error);
    alert("An unexpected error occurred. Please try again.");
  }
}

async function fetchAndDisplayArticleDetails() {
  try {
    const documentId = getDocumentIdFromUrl();
    if (!documentId) {
      console.error("No documentId found in the URL.");
      document.getElementById("article-container").innerHTML =
        "<p>Article not found.</p>";
      return;
    }

    const response = await fetch(
      `${API_BASE_URL}/api/blogs?populate=*&filters[documentId][$eq]=${documentId}`
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      console.error("Article not found.");
      document.getElementById("article-container").innerHTML =
        "<p>Article not found.</p>";
      return;
    }

    const article = data.data[0];
    const attr = article.attributes;

    const title = attr?.Title || "Title not available";
    const contentMarkdown = attr?.content || "Content not available";
    const md = window.markdownit();
    const contentHTML = md.render(contentMarkdown);
    const formattedContentHTML = formatFirstLetter(contentHTML);

    const publishedDate = attr?.publishedAt
      ? new Date(attr.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Date not available";

    const theme = attr?.theme?.data?.attributes?.Title || "Creative";

    const media = attr?.media?.data?.[0]?.attributes;
    const documentImage =
      media?.formats?.large?.url ||
      media?.url ||
      "https://via.placeholder.com/800x570";
    const imageUrl = documentImage.startsWith("http")
      ? documentImage
      : `${API_BASE_URL}${documentImage}`;

    const articleContainer = document.getElementById("article-container");
    articleContainer.innerHTML = `
      <div class="col-12 blog-details mb-12">
        <div class="entry-meta mb-20px fs-15">
          <span><i class="text-dark-gray feather icon-feather-calendar"></i><a href="blog-grid.html">${publishedDate}</a></span>
          <span><i class="text-dark-gray feather icon-feather-user"></i><a href="blog-grid.html">RPAM</a></span>
          <span><i class="text-dark-gray feather icon-feather-folder"></i><a href="blog-grid.html">${theme}</a></span>
        </div>
        <h5 class="text-dark-gray fw-600 w-80 sm-w-100 mb-6">${title}</h5>
        <img src="${imageUrl}" alt="${title}" class="w-100 border-radius-6px mb-7">
        <div class="text-dark-gray">${formattedContentHTML}</div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching article details:", error);
    document.getElementById("article-container").innerHTML =
      "<p>Failed to load article details. Please try again later.</p>";
  }
}

fetchAndDisplayArticleDetails();
