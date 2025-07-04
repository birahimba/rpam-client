// ✅ Définir l'URL de base de l'API Strapi en ligne
const API_BASE_URL = "https://rpam-back.onrender.com"; // Remplace par ton URL exacte

function getDocumentIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("documentId");
}

// ✅ Gérer la soumission du formulaire de commentaire
async function handleCommentFormSubmission(event) {
  event.preventDefault();

  const documentId = getDocumentIdFromUrl();
  if (!documentId) {
    alert("Error: Unable to identify the article. Please reload the page.");
    return;
  }

  const name = document.querySelector("input[name='name']").value.trim();
  const email = document.querySelector("input[name='email']").value.trim();
  const comment = document
    .querySelector("textarea[name='comment']")
    .value.trim();
  const publishedDate = new Date().toISOString();

  if (!name || !email || !comment) {
    alert("Please fill out all required fields.");
    return;
  }

  const commentData = {
    data: {
      Name: name,
      email: email,
      comment: comment,
      blog: documentId,
      publishedDate: publishedDate,
      like: "0",
      locale: "fr",
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Thank you! Your comment has been posted successfully.");
      document.querySelector("input[name='name']").value = "";
      document.querySelector("input[name='email']").value = "";
      document.querySelector("textarea[name='comment']").value = "";
      updateCommentsSection(result.data);
    } else {
      const errorResponse = await response.json();
      alert(
        `Error: ${
          errorResponse.error?.message ||
          "Failed to post your comment. Please try again later."
        }`
      );
    }
  } catch (error) {
    console.error("Error posting comment:", error);
    alert("An unexpected error occurred. Please try again.");
  }
}

// ✅ Mise à jour dynamique de la section des commentaires
function updateCommentsSection(newComment) {
  const commentsContainer = document.getElementById("comments-container");
  const { Name, email, comment, publishedDate } = newComment.attributes;
  const formattedDate = new Date(publishedDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const wrapper = document.createElement("div");
  wrapper.className =
    "d-block d-md-flex w-100 align-items-center align-items-md-start mb-4";

  const imageContainer = document.createElement("div");
  imageContainer.className = "w-90px sm-w-65px sm-mb-10px";
  const img = document.createElement("img");
  img.src = "https://via.placeholder.com/130x130";
  img.className = "rounded-circle";
  img.alt = Name;
  imageContainer.appendChild(img);

  const textContainer = document.createElement("div");
  textContainer.className = "w-100 ps-30px last-paragraph-no-margin sm-ps-0";

  const nameLink = document.createElement("a");
  nameLink.href = "#";
  nameLink.className = "text-dark-gray fw-600";
  nameLink.textContent = Name;

  const dateDiv = document.createElement("div");
  dateDiv.className = "fs-14 lh-24 mb-10px";
  dateDiv.textContent = formattedDate;

  const commentP = document.createElement("p");
  commentP.className = "w-85 sm-w-100";
  commentP.textContent = comment;

  const emailSmall = document.createElement("small");
  emailSmall.className = "text-muted";
  emailSmall.textContent = `Email: ${email}`;

  textContainer.append(nameLink, dateDiv, commentP, emailSmall);
  wrapper.append(imageContainer, textContainer);

  commentsContainer.appendChild(wrapper);
}

// ✅ Activer le gestionnaire d'événement sur le formulaire
document
  .querySelector(".contact-form-style-02")
  .addEventListener("submit", handleCommentFormSubmission);
