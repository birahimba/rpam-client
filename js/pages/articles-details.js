// Function to get the documentId from the URL query string
function getDocumentIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("documentId");
}

// Function to format the first letter of the content
function formatFirstLetter(htmlContent) {
  if (!htmlContent || htmlContent.length === 0) return htmlContent;

  // Convert the HTML string into a DOM object to manipulate it
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  // Get the first paragraph or text node
  const firstParagraph = doc.body.querySelector("p") || doc.body.firstChild;

  if (firstParagraph) {
    const textContent = firstParagraph.textContent || "";
    if (textContent.length > 0) {
      const firstLetter = textContent[0];
      const restOfText = textContent.slice(1);

      // Replace the paragraph content with formatted first letter
      firstParagraph.innerHTML = `<span class="alt-font first-letter text-dark-gray">${firstLetter}</span>${restOfText}`;
    }
  }

  // Ensure blockquotes are wrapped correctly and retain their style
  const blockquotes = doc.body.querySelectorAll("blockquote");
  blockquotes.forEach((blockquote) => {
    blockquote.classList.add("styled-blockquote");
  });

  // Return the updated HTML content as a string
  return doc.body.innerHTML;
}

// Function to fetch and display the article details
async function fetchAndDisplayArticleDetails() {
  try {
    const documentId = getDocumentIdFromUrl();

    if (!documentId) {
      console.error("No documentId found in the URL.");
      document.getElementById("article-container").innerHTML =
        "<p>Article not found.</p>";
      return;
    }

    // Fetch the article details from the API using documentId
    const response = await fetch(
      `http://localhost:1337/api/blogs?populate=*&filters[documentId][$eq]=${documentId}`
    );
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      console.error("Article not found.");
      document.getElementById("article-container").innerHTML =
        "<p>Article not found.</p>";
      return;
    }

    const article = data.data[0];
    const title = article?.Title || "Title not available";
    const contentMarkdown = article?.content || "Content not available";

    // Initialize Markdown-it from the CDN
    const md = window.markdownit();

    // Convert Markdown content to HTML
    const contentHTML = md.render(contentMarkdown);

    // Format the first letter of the content and ensure blockquotes are styled
    const formattedContentHTML = formatFirstLetter(contentHTML);

    const publishedDate = article?.publishedAt
      ? new Date(article.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Date not available";
    const theme = article?.theme?.Title || "Creative";
    const documentImage =
      article?.media?.[0]?.formats?.large?.url ||
      article?.media?.[0]?.url ||
      "https://via.placeholder.com/800x570";

    const articleContainer = document.getElementById("article-container");
    articleContainer.innerHTML = `
      <div class="col-12 blog-details mb-12">
        <div class="entry-meta mb-20px fs-15">
            <span><i class="text-dark-gray feather icon-feather-calendar"></i><a href="blog-grid.html">${publishedDate}</a></span>
            <span><i class="text-dark-gray feather icon-feather-user"></i><a href="blog-grid.html">RPAM</a></span>
            <span><i class="text-dark-gray feather icon-feather-folder"></i><a href="blog-grid.html">${theme}</a></span>
        </div>
        <h5 class="text-dark-gray fw-600 w-80 sm-w-100 mb-6">${title}</h5>
        <img src="http://localhost:1337${documentImage}" alt="${title}" class="w-100 border-radius-6px mb-7">
        <div class="text-dark-gray">${formattedContentHTML}</div>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching article details:", error);
    document.getElementById("article-container").innerHTML =
      "<p>Failed to load article details. Please try again later.</p>";
  }
}

// Call the function to fetch and display article details
fetchAndDisplayArticleDetails();
