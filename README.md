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

Le sitemap est servi dynamiquement par `pages/sitemap.xml.js` : les URLs d'articles
sont lues depuis l'API à chaque génération (cache CDN de 5 minutes), il n'y a donc
plus de fichier à régénérer après une publication. Les pages fixes sont listées
dans `lib/sitemap.js`.

## Variables d'environnement

Les articles du blog sont servis par l'API publique de **rpam-connect**, où ils
sont rédigés dans un back-office.

| Variable | Requise | Valeur | Rôle |
| --- | --- | --- | --- |
| `RPAM_CONNECT_API_KEY` | oui | clé partagée | authentifie les appels (en-tête `x-api-key`) |
| `RPAM_CONNECT_URL` | non | `https://connect.rpam.fr` | base de l'API ; défaut appliqué si absente |
| `REVALIDATE_SECRET` | non | secret aléatoire | authentifie les appels de revalidation à la demande |

### Revalidation à la demande

Les pages de blog sont en ISR (`revalidate: 300`). Une publication ou une
suppression met donc jusqu'à deux rechargements après cinq minutes pour se voir :
la première requête qui suit la péremption sert encore la page en cache et ne
fait que déclencher la régénération en arrière-plan.

Pour un effet immédiat, rpam-connect appelle après chaque écriture :

```bash
curl -X POST https://www.rpam.fr/api/revalidate \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"slug":"mon-article"}'
```

Le `slug` est facultatif : sans lui, seules `/` et `/blogs` sont régénérées.
Si `REVALIDATE_SECRET` n'est pas défini, la route répond 500 et ne régénère
rien — elle n'est jamais ouverte par défaut.

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
