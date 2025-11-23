const API_BASE_URL = "https://rpam-back.onrender.com";

// Function to fetch and display articles from the API
async function fetchAndDisplayArticles() {
  const articlesContainer = document.getElementById("articles-container");
  if (!articlesContainer) {
    console.error("Container 'articles-container' is missing in the HTML.");
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs?populate=*&sort=publishedAt:desc`
    );

    if (!response.ok) {
      throw new Error("API response not OK");
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      // On vide d'abord le container au cas où il y ait un message par défaut
      articlesContainer.innerHTML = "";

      data.data.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("col-12", "mb-40px");

        const title = article?.attributes?.Title || "Titre non disponible";
        const content =
          article?.attributes?.content || "Contenu non disponible";
        const publishedDate =
          article?.attributes?.publishedAt || "Date non disponible";
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
          <div class="card border-0 no-border-radius box-shadow-extra-large h-100">
            <div class="blog-image">
              <a href="article.html?documentId=${documentId}">
                <img src="${imageUrl}" alt="${title}" loading="lazy" />
              </a>
              <div class="blog-categories">
                <a href="blogs.html" class="categories-btn bg-white text-dark-gray text-dark-gray-hover text-uppercase alt-font fw-600">
                  ${
                    article?.attributes?.theme?.data?.attributes?.Title ||
                    "Catégorie"
                  }
                </a>
              </div>
            </div>
            <div class="card-body p-5 bg-white">
              <div class="entry-meta mb-20px fs-15">
                <span>
                  <i class="feather icon-feather-calendar"></i>
                  <span>${new Date(publishedDate).toLocaleDateString(
                    "fr-FR"
                  )}</span>
                </span>
              </div>
              <a href="article.html?documentId=${documentId}" class="text-dark-gray card-title mb-20px fw-600 fs-24 d-block">
                ${title}
              </a>
              <p class="text-medium-gray mb-20px">
                ${content.replace(/\n/g, "<br>").slice(0, 150)}...
              </p>
              <a href="article.html?documentId=${documentId}" class="btn btn-link btn-large text-base-color fw-600">
                Continuer<span class="bg-base-color"></span>
              </a>
            </div>
          </div>
        `;

        articlesContainer.appendChild(articleElement);
      });
    } else {
      // ÉTAT VIDE : aucun article
      articlesContainer.innerHTML = `
        <div class="col-12">
          <div class="card border-0 box-shadow-extra-large p-5 text-center">
            <h2 class="alt-font fw-600 mb-3">Aucun article publié pour le moment</h2>
            <p class="fs-16 mb-4">
              Revenez bientôt, de nouveaux contenus seront prochainement disponibles pour vous aider à booster votre carrière.
            </p>
            <a href="booking.html" class="btn btn-base-color btn-rounded btn-box-shadow">
              Réserver un rendez-vous
            </a>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error fetching articles:", error);

    // MESSAGE EN CAS D’ERREUR API
    const articlesContainer = document.getElementById("articles-container");
    if (articlesContainer) {
      articlesContainer.innerHTML = `
        <div class="col-12">
          <div class="card border-0 box-shadow-extra-large p-5 text-center">
            <h2 class="alt-font fw-600 mb-3">Impossible de charger les articles</h2>
            <p class="fs-16 mb-4">
              Une erreur est survenue lors du chargement des articles. Veuillez réessayer plus tard.
            </p>
            <a href="contact.html" class="btn btn-dark-gray btn-rounded">
              Nous contacter
            </a>
          </div>
        </div>
      `;
    }
  }
}

// Call the function
fetchAndDisplayArticles();
