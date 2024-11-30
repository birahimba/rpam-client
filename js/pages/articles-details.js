// Function to get the documentId from the URL query string
function getDocumentIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("documentId");
}

// Function to format the first letter of the content
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

// Function to handle likes for comments
async function handleLike(commentId, likeCountElement) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            like: { $increment: 1 }, // Increment the like count
          },
        }),
      }
    );

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

    const md = window.markdownit();
    const contentHTML = md.render(contentMarkdown);
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
      article?.media?.[0]?.formats?.large?.url ??
      article?.media?.[0]?.url ??
      "https://via.placeholder.com/800x570";
    const imageUrl = documentImage.startsWith("http")
      ? documentImage
      : `http://localhost:1337${documentImage}`;

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

    const comments = article.comments || [];
    const commentsContainer = document.getElementById("comments-container");
    if (comments.length === 0) {
      commentsContainer.innerHTML +=
        "<p>No comments yet. Be the first to comment!</p>";
    } else {
      const commentsHTML = comments
        .map((comment) => {
          const { id, Name, comment: content, like, publishedDate } = comment;
          const formattedDate = new Date(publishedDate).toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          );

          return `
            <div class="d-block d-md-flex w-100 align-items-center align-items-md-start mb-4">
              <div class="w-90px sm-w-65px sm-mb-10px">
                  <img src="https://via.placeholder.com/130x130" class="rounded-circle" alt="${Name}">
              </div>
              <div class="w-100 ps-30px last-paragraph-no-margin sm-ps-0">
                  <a href="#" class="text-dark-gray fw-600">${Name}</a>
                  <div class="fs-14 lh-24 mb-10px">${formattedDate}</div>
                  <p class="w-85 sm-w-100">${content}</p>
              </div>
              <div class="tag-cloud col-12 col-md-3 text-uppercase text-center text-md-end">
                  <a class="likes-comments-count fw-500 mx-0" href="#" onclick="handleLike(${id}, this.querySelector('.like-count'))">
                      <i class="fa-regular fa-heart text-red me-10px"></i>
                      <span class="text-dark-gray text-dark-gray-hover like-count">${like} Likes</span>
                  </a>
              </div>
            </div>
          `;
        })
        .join("");

      commentsContainer.innerHTML += commentsHTML;
    }
  } catch (error) {
    console.error("Error fetching article details:", error);
    document.getElementById("article-container").innerHTML =
      "<p>Failed to load article details. Please try again later.</p>";
  }
}

// Call the function to fetch and display article details
fetchAndDisplayArticleDetails();
