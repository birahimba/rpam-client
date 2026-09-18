// Client de l'API publique des articles de rpam-connect.
//
// Point d'entrée unique : aucun autre fichier ne doit appeler l'API directement.
// À n'utiliser que côté serveur (getStaticProps / getStaticPaths / route API) :
// la clé est un secret et ne doit jamais atteindre le bundle navigateur.
//
// Politique d'erreur : tout échec autre qu'un 404 sur un slug précis lève une
// exception et fait échouer le build. Un blog qui se déploierait sans articles
// serait une régression SEO silencieuse — on préfère un build rouge.

const DEFAULT_BASE_URL = 'https://connect.rpam.fr'

// L'API plafonne limit à 100 ; on pagine par lots maximaux pour limiter les allers-retours.
const PAGE_SIZE = 100

// Garde-fou : borne le nombre de pages parcourues si l'API renvoyait un curseur
// qui ne progresse pas, plutôt que de boucler indéfiniment pendant le build.
const MAX_PAGES = 50

function getConfig() {
  const apiKey = process.env.RPAM_CONNECT_API_KEY
  if (!apiKey) {
    throw new Error(
      "Blog API : la variable d'environnement RPAM_CONNECT_API_KEY est absente. " +
        'Renseignez-la dans .env.local en développement et dans les variables du projet en déploiement.'
    )
  }
  const baseUrl = (process.env.RPAM_CONNECT_URL || DEFAULT_BASE_URL).replace(/\/+$/, '')
  return { apiKey, baseUrl }
}

/**
 * Appelle l'API et retourne le contenu de `data`.
 * Retourne null uniquement sur un 404 lorsque `allowNotFound` est vrai.
 * Volontairement sans en-tête If-None-Match : un 304 arriverait sans corps et
 * ferait échouer le parsing.
 */
async function requestData(path, { allowNotFound = false } = {}) {
  const { apiKey, baseUrl } = getConfig()
  const url = `${baseUrl}${path}`

  let response
  try {
    response = await fetch(url, {
      headers: { 'x-api-key': apiKey, Accept: 'application/json' },
    })
  } catch (cause) {
    throw new Error(`Blog API injoignable sur ${url} : ${cause.message}`, { cause })
  }

  if (response.status === 404 && allowNotFound) return null

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    const detail = body ? ` — ${body.slice(0, 300)}` : ''
    throw new Error(`Blog API : réponse HTTP ${response.status} sur ${url}${detail}`)
  }

  let payload
  try {
    payload = await response.json()
  } catch (cause) {
    throw new Error(`Blog API : réponse illisible (JSON invalide) sur ${url}`, { cause })
  }

  if (!payload || typeof payload.data !== 'object' || payload.data === null) {
    throw new Error(`Blog API : réponse inattendue sur ${url}, champ "data" absent`)
  }

  return payload.data
}

/** Tri d'affichage : du plus récent au plus ancien, à date égale on conserve l'ordre de l'API. */
function byDateDesc(a, b) {
  return String(b.date || '').localeCompare(String(a.date || ''))
}

/**
 * Retourne toutes les cartes d'articles publiés, pagination parcourue jusqu'au bout.
 * Les cartes ne portent pas le corps Markdown : utiliser fetchArticleBySlug pour cela.
 */
export async function fetchArticles() {
  const articles = []
  let cursor = null

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const query = new URLSearchParams({ limit: String(PAGE_SIZE) })
    if (cursor) query.set('cursor', cursor)

    const data = await requestData(`/api/public/articles?${query}`)

    if (!Array.isArray(data.articles)) {
      throw new Error('Blog API : réponse inattendue, "data.articles" n\'est pas un tableau')
    }
    articles.push(...data.articles)

    if (!data.nextCursor) {
      return articles.sort(byDateDesc)
    }
    if (data.nextCursor === cursor) {
      throw new Error(`Blog API : curseur de pagination bloqué sur "${cursor}"`)
    }
    cursor = data.nextCursor
  }

  throw new Error(
    `Blog API : pagination interrompue après ${MAX_PAGES} pages, curseur toujours non nul`
  )
}

/**
 * Retourne l'article complet (carte + content Markdown + faqs + pillarSlug),
 * ou null si le slug est inconnu ou l'article non publié — seul cas où l'absence
 * de donnée est normale, afin de permettre le notFound: true de Next.
 */
export async function fetchArticleBySlug(slug) {
  return requestData(`/api/public/articles/${encodeURIComponent(slug)}`, { allowNotFound: true })
}
