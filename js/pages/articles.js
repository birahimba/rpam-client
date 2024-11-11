async function fetchAndDisplayArticles() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/blogs?populate=*&sort=publishedAt:desc"
    );
    const data = await response.json();

    const articlesContainer = document.getElementById("articles-container");
    const popularPostsContainer = document.getElementById(
      "popular-posts-container"
    );

    if (!articlesContainer || !popularPostsContainer) {
      console.error(
        "Les conteneurs 'articles-container' ou 'popular-posts-container' n'existent pas dans le HTML."
      );
      return;
    }

    if (data.data && data.data.length > 0) {
      // Afficher les articles principaux
      data.data.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("col-12", "mb-40px");

        const title = article.Title || "Titre non disponible";
        const content = article.Content || "Contenu non disponible";
        const publishedDate = article.publishedAt || "Date non disponible";

        // URL de l'image principale
        let imageUrl = "https://via.placeholder.com/800x570";
        if (article.media && article.media.length > 0) {
          const mediaFormats = article.media[0].formats;
          imageUrl = mediaFormats.large
            ? `http://localhost:1337${mediaFormats.large.url}`
            : `http://localhost:1337${article.media[0].url}`;
        }

        articleElement.innerHTML = `
          <div class="card border-0 no-border-radius box-shadow-extra-large">
            <div class="blog-image">
              <a href="demo-elearning-blog-single-simple.html?id=${article.id}">
                <img src="${imageUrl}" alt="${title}" />
              </a>
              <div class="blog-categories">
                <a href="blog-grid.html" class="categories-btn bg-white text-dark-gray text-dark-gray-hover text-uppercase alt-font fw-600">${
                  article.theme.Title
                }</a>
              </div>
            </div>
            <div class="card-body p-9 bg-white">
              <div class="entry-meta mb-20px fs-15">
                <span><i class="feather icon-feather-calendar"></i>
                  <a href="blog-grid.html">${new Date(
                    publishedDate
                  ).toLocaleDateString()}</a>
                </span>
              </div>
              <a href="demo-elearning-blog-single-simple.html?id=${
                article.id
              }" class="text-dark-gray card-title mb-20px fw-600 fs-24 d-block">${title}</a>
              <p class="text-medium-gray mb-20px">${content.slice(
                0,
                150
              )}...</p>
              <a href="demo-elearning-blog-single-simple.html?id=${
                article.id
              }" class="btn btn-link btn-large text-base-color fw-600">
                Continue reading<span class="bg-base-color"></span>
              </a>
            </div>
          </div>
        `;

        articlesContainer.appendChild(articleElement);
      });

      // Afficher les articles populaires
      const popularPostsList = document.createElement("ul");
      popularPostsList.classList.add(
        "popular-post-sidebar",
        "position-relative"
      );

      data.data.slice(0, 3).forEach((article) => {
        const listItem = document.createElement("li");
        listItem.classList.add("d-flex", "align-items-center");

        const title = article.Title || "Titre non disponible";
        const publishedDate = article.publishedAt || "Date non disponible";

        // URL de l'image pour les articles populaires (miniature)
        let imageUrl = "https://via.placeholder.com/600x600";
        if (article.media && article.media.length > 0) {
          const mediaFormats = article.media[0].formats;
          imageUrl = mediaFormats.thumbnail
            ? `http://localhost:1337${mediaFormats.thumbnail.url}`
            : `http://localhost:1337${article.media[0].url}`;
        }

        listItem.innerHTML = `
          <figure>
            <a href="demo-elearning-blog-single-simple.html?id=${article.id}">
              <img src="${imageUrl}" alt="${title}" />
            </a>
          </figure>
          <div class="col media-body">
            <a href="demo-elearning-blog-single-simple.html?id=${
              article.id
            }" class="fw-600 fs-17 text-dark-gray d-inline-block mb-10px">${title}</a>
            <div><a href="blog-grid.html" class="d-inline-block fs-15">${new Date(
              publishedDate
            ).toLocaleDateString()}</a></div>
          </div>
        `;

        popularPostsList.appendChild(listItem);
      });

      // Titre de la section "Popular posts"
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

      // Ajouter le titre et la liste d'articles populaires au conteneur
      popularPostsContainer.appendChild(popularPostsTitle);
      popularPostsContainer.appendChild(popularPostsList);
    } else {
      articlesContainer.innerHTML = "<p>Aucun article trouvé.</p>";
      popularPostsContainer.innerHTML =
        "<p>Aucun article populaire disponible.</p>";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    if (articlesContainer) {
      articlesContainer.innerHTML =
        "<p>Impossible de charger les articles.</p>";
    }
    if (popularPostsContainer) {
      popularPostsContainer.innerHTML =
        "<p>Impossible de charger les articles populaires.</p>";
    }
  }
}

// Appeler la fonction pour récupérer et afficher les articles
fetchAndDisplayArticles();
