// Slugs d'articles encore servis par une page dédiée dans pages/blog/ : leur route
// statique a priorité sur la route dynamique pages/blog/[slug].jsx, et Next refuse
// un chemin en double. Le sitemap doit malgré tout les déclarer, même si l'API ne
// les connaît pas (encore) — d'où ce point de partage unique.
// À vider une fois ces pages migrées dans le back-office.
export const STATIC_ARTICLE_SLUGS = ['reconversion-professionnelle-30-40-50-ans']
