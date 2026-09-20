// Revalidation à la demande, appelée par le back-office rpam-connect à chaque
// publication, modification ou suppression d'article.
//
// Sans elle, une suppression met jusqu'à deux rechargements après la fenêtre ISR
// de 5 minutes pour disparaître du site : la première requête qui suit la
// péremption sert encore la page en cache et se contente de déclencher la
// régénération en arrière-plan (stale-while-revalidate). Cette route force la
// régénération immédiatement, et supprime au passage la fenêtre pendant laquelle
// le sitemap — lui servi en direct — et les pages se contredisent.
//
// Contrat attendu côté rpam-connect :
//   POST /api/revalidate
//   x-revalidate-secret: <REVALIDATE_SECRET>
//   { "slug": "mon-article" }   // slug facultatif : absent, seules les listes
//                               // sont régénérées
//
// La réponse liste les chemins réellement régénérés. Un slug supprimé est un
// appel normal : la page sera régénérée, getStaticProps renverra notFound et
// l'URL basculera en 404.

import crypto from 'crypto'

// Listes à rafraîchir à chaque changement, quel que soit l'article concerné.
const LIST_PATHS = ['/', '/blogs']

// Un slug ne doit composer qu'une URL de blog : on refuse tout ce qui pourrait
// désigner un autre chemin (séquences ../, slash, encodage).
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Comparaison à temps constant, pour ne pas laisser le secret fuir par la durée de réponse. */
function secretMatches(provided, expected) {
  const a = Buffer.from(String(provided))
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Méthode non autorisée' })
  }

  const expected = process.env.REVALIDATE_SECRET
  if (!expected) {
    // Échec fermé : sans secret configuré, la route reste inutilisable plutôt
    // que d'offrir une régénération déclenchable par n'importe qui.
    console.error('Revalidation : REVALIDATE_SECRET absent des variables d\'environnement')
    return res.status(500).json({ error: 'Revalidation non configurée' })
  }

  const provided = req.headers['x-revalidate-secret']
  if (!provided || !secretMatches(provided, expected)) {
    return res.status(401).json({ error: 'Secret invalide' })
  }

  const slug = req.body?.slug
  if (slug !== undefined && (typeof slug !== 'string' || !SLUG_PATTERN.test(slug))) {
    return res.status(400).json({ error: 'Slug invalide' })
  }

  const paths = slug ? [...LIST_PATHS, `/blog/${slug}`] : [...LIST_PATHS]
  const revalidated = []
  const failed = []

  for (const path of paths) {
    try {
      await res.revalidate(path)
      revalidated.push(path)
    } catch (error) {
      // Une page absente du build ou déjà en 404 n'est pas une erreur bloquante :
      // on la signale sans faire échouer les autres régénérations.
      console.error(`Revalidation échouée pour ${path} : ${error.message}`)
      failed.push(path)
    }
  }

  return res.status(failed.length > 0 ? 207 : 200).json({ revalidated, failed })
}
