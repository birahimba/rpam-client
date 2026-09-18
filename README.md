# rpam-client

Site vitrine RPAM — Next.js 14 (Pages Router), déployé sur Vercel.

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner RPAM_CONNECT_API_KEY
npm run dev
```

| Script | Rôle |
| --- | --- |
| `npm run dev` | serveur de développement |
| `npm run build` | build de production |
| `npm start` | serveur de production |
| `npm run sitemap` | régénère `public/sitemap.xml` |

## Variables d'environnement

Les articles du blog sont servis par l'API publique de **rpam-connect**, où ils
sont rédigés dans un back-office.

| Variable | Requise | Valeur | Rôle |
| --- | --- | --- | --- |
| `RPAM_CONNECT_API_KEY` | oui | clé partagée | authentifie les appels (en-tête `x-api-key`) |
| `RPAM_CONNECT_URL` | non | `https://connect.rpam.fr` | base de l'API ; défaut appliqué si absente |

Aucune des deux ne doit porter le préfixe `NEXT_PUBLIC_` : il inlinerait la clé
dans le bundle navigateur. Elles ne sont lues que dans `lib/blog-api.js`, appelé
exclusivement depuis `getStaticProps` / `getStaticPaths`.

Si `RPAM_CONNECT_API_KEY` est absente, ou si l'API répond une erreur, **le build
échoue volontairement** : déployer un blog sans articles serait une régression
SEO silencieuse.

## Blog

- `lib/blog-api.js` — seul point d'appel de l'API (`fetchArticles`, `fetchArticleBySlug`)
- `pages/blog/[slug].jsx` — page article, revalidation ISR toutes les 300 s
- `pages/blogs.jsx`, `pages/index.jsx` — listes d'articles, même revalidation

Le corps des articles est du Markdown, rendu par `marked` puis assaini par
`isomorphic-dompurify` avant injection.

Les fichiers de `content/` (anciens `.md` et `articles.js`) ne sont plus lus ;
ils sont conservés le temps de vérifier la bascule en production.
