// Sitemap servi dynamiquement : les URLs /blog/<slug> sont lues à chaque
// génération depuis l'API rpam-connect, si bien qu'un article publié ou
// dépublié dans le back-office entre dans le sitemap — ou en sort — sans
// redéploiement ni édition manuelle d'un fichier versionné.
//
// Cache : la réponse est mise en cache côté CDN 5 minutes (même fenêtre que la
// revalidation ISR des pages de blog), puis servie périmée pendant 24 h le temps
// du rafraîchissement en arrière-plan. Googlebot ne frappe donc jamais l'API.
//
// Politique d'erreur : identique à celle de lib/blog-api.js — un échec de l'API
// remonte en 500 plutôt que de servir un sitemap amputé de tous les articles.
// Google conserve alors la dernière version lue et réessaie, là où un sitemap
// tronqué déclarerait implicitement les articles comme disparus.

import { fetchArticles } from '../lib/blog-api'
import { buildSitemap } from '../lib/sitemap'

const CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=86400'

export async function getServerSideProps({ res }) {
  const articles = await fetchArticles()

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', CACHE_CONTROL)
  res.write(buildSitemap(articles))
  res.end()

  return { props: {} }
}

// Jamais rendu : getServerSideProps termine la réponse lui-même.
export default function Sitemap() {
  return null
}
