# Plan de migration Next.js — RPAM

> **Objectif :** Migrer le site vitrine statique (HTML/CSS/JS) vers Next.js  
> **Contrainte principale :** Conserver 100 % du design, des CSS et des animations JavaScript existants  
> **Horizon :** Quelques semaines après la rédaction de ce document  

---

## 1. État des lieux

### Pages actuelles

| Fichier HTML | URL propre | Rôle |
|---|---|---|
| `index.html` | `/` | Accueil |
| `about.html` | `/about` | Qui sommes-nous |
| `services.html` | `/services` | Vue d'ensemble des services |
| `guidance.html` | `/guidance` | Service : Orientation |
| `up-training.html` | `/up-training` | Service : Formation |
| `job-getting.html` | `/job-getting` | Service : Coaching emploi |
| `booking.html` | `/booking` | Prise de rendez-vous |
| `blogs.html` | `/blogs` | Liste des articles de blog |
| `news.html` | `/news` | Actualités |
| `blog/reconversion-*.html` | `/blog/reconversion-*` | Article statique |

### CSS à préserver (intégralement)

**Fichiers locaux (`/css/`) :**
- `vendors.min.css` — CSS tiers bundlés (Crafto Theme)
- `icon.min.css` — polices d'icônes Feather
- `style.min.css` — styles principaux du thème
- `responsive.min.css` — responsive design
- `corporate.css` — surcharges visuelles RPAM
- `navbar-modern.css` — barre de navigation personnalisée
- `pages.css` — styles spécifiques aux pages
- `services-page.css` — styles de la page services

**CDN externes :**
- Google Fonts Montserrat
- AOS 2.3.1 (animations au scroll)
- Bootstrap Icons 1.11.1
- Swiper 11 (slider hero)
- Flatpickr (date picker sur booking)

### JavaScript à préserver (critique pour les animations)

**Fichiers locaux (`/js/`) :**
- `jquery.js` — jQuery (dépendance de tout le thème)
- `vendors.min.js` — bundle Crafto Theme contenant : GSAP, Anime.js, Atropos.js, Parallax.js, Splitting.js, Swiper, Isotope, Particles.js, CountTo, ImagesLoaded, Magnific Popup, Skrollr, etc.
- `main.js` — orchestration du thème Crafto v2.0 (initialise tout)

**CDN externes :**
- Bootstrap 5.3.3 JS
- AOS 2.3.1 JS
- Swiper 11 JS
- Flatpickr JS

**Animations clés actuellement gérées par ce JS :**
- Custom cursor animé (`.custom-cursor`)
- Navbar scroll effect (classe `.scrolled`)
- Slider hero (Swiper fade + autoplay)
- Animations au scroll (AOS avec `data-aos="..."`)
- Parallax sections
- Splitting.js sur titres animés
- Effets de compteurs
- Menu mobile avec animations
- Smooth scroll

---

## 2. Principes directeurs de la migration

### Principe 1 — Pages Router, pas App Router

Utiliser le **Pages Router** de Next.js (dossier `/pages/`), pas le nouveau App Router.

**Pourquoi :** Le App Router (React Server Components) est incompatible avec jQuery et les bibliothèques qui manipulent directement le DOM au chargement. Le Pages Router permet de charger les scripts existants via `next/script` avec `strategy="afterInteractive"`, ce qui reproduit fidèlement le comportement actuel d'un `DOMContentLoaded`.

### Principe 2 — CSS inchangés, copiés dans `/public/`

Tous les fichiers CSS sont copiés tels quels dans `public/css/`. Ils sont chargés via des balises `<link>` dans `_document.js` (équivalent Next.js du `<head>` HTML), exactement comme dans les fichiers HTML actuels. **Aucune modification de CSS n'est nécessaire.**

### Principe 3 — JS principaux chargés via `next/script`

`jquery.js`, `vendors.min.js` et `main.js` sont chargés avec `next/script strategy="afterInteractive"`. Cette stratégie attend que la page soit hydratée par React avant d'exécuter les scripts, ce qui correspond exactement à l'équivalent d'un `DOMContentLoaded` en HTML classique. **Les scripts ne sont pas modifiés.**

```jsx
// Dans _app.js
import Script from 'next/script'

<Script src="/js/jquery.js" strategy="afterInteractive" />
<Script src="/js/vendors.min.js" strategy="afterInteractive" />
<Script src="/js/main.js" strategy="afterInteractive" />
```

### Principe 4 — AOS et Swiper initialisés dans `useEffect`

Les scripts inline actuels (`AOS.init(...)`, `new Swiper(...)`) sont déplacés dans des hooks `useEffect` dans le composant Layout ou dans chaque page. C'est le seul changement de logique — la bibliothèque elle-même (AOS, Swiper) reste la même.

```jsx
// Dans Layout.jsx
import { useEffect } from 'react'

useEffect(() => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 50 })
  }
}, [])
```

### Principe 5 — Attributs de body dans `_document.js`

L'attribut `data-mobile-nav-style="classic"` et la classe `custom-cursor` sur `<body>` (requis par main.js pour activer le curseur animé et le menu) sont déclarés une fois dans `_document.js`.

```jsx
// Dans _document.js
<body className="custom-cursor" data-mobile-nav-style="classic">
  <Main />
  <NextScript />
</body>
```

---

## 3. Architecture Next.js proposée

```
rpam-client-next/
│
├── public/                      ← Assets statiques (copiés tels quels)
│   ├── css/                     ← Copie du dossier css/ actuel
│   │   ├── vendors.min.css
│   │   ├── icon.min.css
│   │   ├── style.min.css
│   │   ├── responsive.min.css
│   │   ├── corporate.css
│   │   ├── navbar-modern.css
│   │   ├── pages.css
│   │   └── services-page.css
│   ├── js/                      ← Copie du dossier js/ actuel (inchangé)
│   │   ├── jquery.js
│   │   ├── vendors.min.js
│   │   └── main.js
│   ├── images/                  ← Copie du dossier images/ actuel
│   ├── fonts/                   ← Copie du dossier fonts/ actuel
│   └── sitemap.xml
│
├── pages/                       ← Pages Next.js (Pages Router)
│   ├── _document.js             ← Structure HTML globale (lang, body classes)
│   ├── _app.js                  ← CSS globaux + scripts jQuery/vendors/main
│   ├── index.jsx                ← Accueil (/)
│   ├── about.jsx                ← /about
│   ├── services.jsx             ← /services
│   ├── guidance.jsx             ← /guidance
│   ├── up-training.jsx          ← /up-training
│   ├── job-getting.jsx          ← /job-getting
│   ├── booking.jsx              ← /booking
│   ├── blogs.jsx                ← /blogs
│   ├── news.jsx                 ← /news
│   └── blog/
│       └── [slug].jsx           ← /blog/:slug (getStaticPaths + getStaticProps)
│
├── components/
│   ├── Layout.jsx               ← Wrapper commun (Navbar + Footer + Scripts)
│   ├── Navbar.jsx               ← Navigation extraite des HTML
│   ├── Footer.jsx               ← Pied de page extrait des HTML
│   └── SEOHead.jsx              ← next/head avec title, description, OG, canonical
│
├── content/
│   └── blog/
│       └── reconversion-*.mdx   ← Articles de blog en MDX (ou JSON)
│
├── next.config.js
└── package.json
```

---

## 4. Étapes de migration

### Phase 1 — Initialisation du projet Next.js

```bash
npx create-next-app@latest rpam-client-next --no-typescript --no-tailwind --no-eslint --no-app --no-src-dir
cd rpam-client-next
```

Installer les dépendances nécessaires :

```bash
npm install next-mdx-remote gray-matter
```

### Phase 2 — Copie des assets

Copier les dossiers `css/`, `js/`, `images/`, `fonts/` dans `public/` sans modification :

```bash
cp -r ../rpam-client/css   public/css
cp -r ../rpam-client/js    public/js
cp -r ../rpam-client/images public/images
cp -r ../rpam-client/fonts  public/fonts
cp ../rpam-client/sitemap.xml public/sitemap.xml
cp ../rpam-client/robots.txt  public/robots.txt
```

**Point de contrôle :** Aucun fichier CSS ou JS ne doit être modifié à cette étape.

### Phase 3 — Création de `_document.js`

Ce fichier reproduit la structure `<html>` et `<body>` commune à tous les HTML actuels :

```jsx
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        {/* CSS locaux */}
        <link rel="stylesheet" href="/css/vendors.min.css" />
        <link rel="stylesheet" href="/css/icon.min.css" />
        <link rel="stylesheet" href="/css/style.min.css" />
        <link rel="stylesheet" href="/css/responsive.min.css" />
        <link rel="stylesheet" href="/css/corporate.css" />
        <link rel="stylesheet" href="/css/navbar-modern.css" />
        <link rel="stylesheet" href="/css/pages.css" />

        {/* CDN CSS */}
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />

        {/* Favicon */}
        <link rel="icon" type="image/png" href="/images/favicon-32x32.png" />
      </Head>
      <body className="custom-cursor" data-mobile-nav-style="classic">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

### Phase 4 — Création de `_app.js`

Ce fichier charge les scripts JS locaux et CDN une seule fois pour toutes les pages :

```jsx
// pages/_app.js
import Script from 'next/script'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Réinitialiser AOS à chaque changement de page (navigation SPA)
    if (typeof AOS !== 'undefined') {
      AOS.refresh()
    }
  })

  return (
    <>
      <Component {...pageProps} />

      {/* Scripts locaux — ordre impératif */}
      <Script src="/js/jquery.js" strategy="afterInteractive" />
      <Script src="/js/vendors.min.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />

      {/* CDN JS */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/flatpickr" strategy="afterInteractive" />
    </>
  )
}
```

> **Note importante sur l'ordre des scripts :** jQuery doit être chargé avant vendors.min.js, qui doit être chargé avant main.js. L'ordre des balises `<Script>` avec `strategy="afterInteractive"` est respecté par Next.js dans l'ordre de déclaration.

### Phase 5 — Composants réutilisables

#### 5.1 — Navbar.jsx

Extraire le bloc `<nav class="navbar-modern">` et le menu mobile `<div class="mobile-menu-modern">` communs à tous les HTML dans un composant React. La seule adaptation est de passer un prop `activePage` pour gérer la classe `active` sur le bon lien.

```jsx
// components/Navbar.jsx
export default function Navbar({ activePage }) {
  return (
    <>
      <nav className="navbar-modern" id="mainNavbar">
        {/* ... HTML copié tel quel, className remplace class ... */}
      </nav>
      <div className="mobile-menu-modern" id="mobileMenu">
        {/* ... HTML copié tel quel ... */}
      </div>
    </>
  )
}
```

**Adaptation JSX :** Remplacer `class=` par `className=`, `for=` par `htmlFor=`, les attributs self-closing (`<br>` → `<br />`). Les `data-*` et `aria-*` restent identiques.

#### 5.2 — Footer.jsx

Même principe : extraire le bloc `<footer class="footer-dark">` dans un composant.

#### 5.3 — Layout.jsx

```jsx
// components/Layout.jsx
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, activePage }) {
  useEffect(() => {
    // Initialisation AOS après montage du composant
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 50 })
    }
  }, [])

  return (
    <>
      <Navbar activePage={activePage} />
      {children}
      <Footer />

      {/* WhatsApp flottant */}
      <a href="https://wa.me/33636415370" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        {/* SVG... */}
      </a>
    </>
  )
}
```

#### 5.4 — SEOHead.jsx

```jsx
// components/SEOHead.jsx
import Head from 'next/head'

export default function SEOHead({ title, description, canonical, ogImage, schema }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Head>
  )
}
```

### Phase 6 — Conversion des pages

Pour chaque page HTML, la conversion suit ce processus :

1. Copier le contenu du `<body>` (hors Navbar et Footer) dans le JSX de la page
2. Remplacer `class=` par `className=`, `for=` par `htmlFor=`
3. Self-closer les balises vides (`<img>`, `<br>`, `<input>`, `<link>`, `<meta>`)
4. Déplacer les `<script>` inline dans `useEffect`
5. Déplacer les métadonnées dans `<SEOHead>`

**Exemple — pages/index.jsx :**

```jsx
// pages/index.jsx
import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Scripts inline actuellement dans index.html (Swiper hero, compteurs, etc.)
    if (typeof Swiper !== 'undefined') {
      new Swiper('.swiper-hero', {
        effect: 'fade',
        autoplay: { delay: 5000, disableOnInteraction: false },
        loop: true,
      })
    }
    // Navbar scroll effect — déjà dans main.js, ne pas dupliquer
  }, [])

  return (
    <Layout activePage="home">
      <SEOHead
        title="RPAM – Coaching professionnel, bilan de compétences et orientation | France"
        description="RPAM : cabinet de coaching professionnel en France..."
        canonical="https://www.rpam.fr"
        schema={/* JSON-LD Organization... */}
      />

      {/* Contenu du body copié et converti en JSX */}
      <section className="hero-section">
        {/* ... */}
      </section>
    </Layout>
  )
}
```

**Pages statiques (pas de données) :** `about`, `services`, `guidance`, `up-training`, `job-getting`, `booking`, `news` → aucune prop de données, juste JSX + SEO.

**Pages avec données :** `blogs` (liste statique d'articles), `blog/[slug]` (contenu MDX).

### Phase 7 — Gestion des animations (point critique)

#### 7.1 — AOS (Animate On Scroll)

AOS utilise des attributs `data-aos="fade-up"` sur les éléments HTML. Ces attributs sont conservés tels quels dans le JSX (React les passe au DOM). La seule adaptation est l'initialisation dans `useEffect` (Phase 5.3).

**Problème potentiel :** En navigation SPA (sans rechargement de page), AOS ne se ré-initialise pas automatiquement. Solution : appeler `AOS.refresh()` dans le `useEffect` sans dépendances dans `_app.js` (déjà prévu Phase 4).

#### 7.2 — main.js / vendors.min.js (GSAP, Anime.js, custom cursor, parallax)

Ces scripts s'initialisent en cherchant des éléments du DOM avec des sélecteurs jQuery/CSS. Comme ils sont chargés avec `strategy="afterInteractive"`, le DOM React est déjà monté quand ils s'exécutent.

**Problème potentiel :** En navigation SPA, main.js ne se ré-exécute pas sur chaque changement de page car il a déjà été chargé. Certains effets (parallax, splitting.js sur les titres) peuvent ne pas s'appliquer aux nouvelles pages.

**Solution :** Après chaque navigation de page, déclencher une ré-initialisation via un événement custom :

```jsx
// Dans _app.js, dans useEffect qui s'exécute à chaque page
useEffect(() => {
  // Forcer la ré-initialisation des effets Crafto Theme après navigation SPA
  if (typeof window !== 'undefined' && window.jQuery) {
    // La plupart des plugins Crafto s'initialisent sur document.ready ou body.
    // Pour les pages qui changent, appeler explicitement :
    if (typeof AOS !== 'undefined') AOS.refresh()
  }
})
```

> **Si ce comportement SPA pose problème :** Utiliser `router.events` de Next.js pour déclencher un rechargement complet des plugins sur `routeChangeComplete`. En dernier recours, désactiver la navigation SPA pour certaines transitions (option `scroll: false` sur les `<Link>`).

#### 7.3 — Swiper Hero Slider

Swiper est initialisé dans les scripts inline de `index.html`. En Next.js, déplacer l'initialisation dans `useEffect` de `pages/index.jsx` :

```jsx
useEffect(() => {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.hero-swiper', {
      // Mêmes options qu'actuellement
    })
  }
}, [])
```

#### 7.4 — Custom Cursor

Le curseur est activé par la classe `custom-cursor` sur `<body>` (gérée dans `_document.js`) et animé par `main.js`. Aucune modification nécessaire.

#### 7.5 — Navbar scroll + mobile menu

Ces scripts sont actuellement en inline dans chaque page HTML. En Next.js, ils peuvent rester dans `main.js` (qui les gère déjà via jQuery) **ou** être extraits dans le composant `Navbar.jsx` avec `useEffect`. Recommandation : laisser `main.js` les gérer, ne rien changer.

### Phase 8 — Migration du blog

#### 8.1 — Structure des articles

Les articles sont des fichiers HTML statiques dans `/blog/`. En Next.js, deux approches possibles :

**Option A (recommandée) — MDX :**
Convertir chaque article HTML en fichier MDX (`content/blog/reconversion-*.mdx`) avec un frontmatter YAML pour les métadonnées SEO. Le contenu HTML est converti en Markdown. La page `pages/blog/[slug].jsx` lit le fichier MDX et le rend avec le même Layout.

```markdown
---
title: "Reconversion professionnelle à 30, 40 ou 50 ans..."
description: "..."
date: "2025-05-11"
coverImage: "/images/blog/reconversion-cover.jpg"
---

## Introduction

Contenu de l'article en Markdown...
```

**Option B (plus simple) — Fichiers statiques dans public/ :**
Conserver les fichiers `blog/reconversion-*.html` dans `public/blog/`. Ils sont servis directement par Next.js sans traitement. C'est la migration zéro risque pour le blog, au prix d'une expérience SPA moins fluide (navigation complète au lieu d'un changement de composant).

> **Recommandation :** Commencer par l'Option B pour aller vite, puis migrer vers MDX au fil des nouveaux articles.

#### 8.2 — Page /blogs (liste des articles)

La page `blogs.jsx` est déjà statique (pas de Hashnode). Elle se convertit directement en JSX. La liste des articles est hardcodée dans le composant ou dans un fichier `content/articles.js` :

```js
// content/articles.js
export const articles = [
  {
    slug: 'reconversion-professionnelle-30-40-50-ans',
    title: 'Reconversion professionnelle à 30, 40 ou 50 ans...',
    excerpt: 'Guide complet pour réussir...',
    date: '2025-05-11',
    readTime: 10,
    coverImage: '/images/blog/reconversion-professionnelle-cover.jpg',
    tags: ['Reconversion', 'Bilan de compétences'],
  },
  // Ajouter chaque nouvel article ici
]
```

### Phase 9 — SEO et métadonnées

Chaque page utilise le composant `SEOHead` avec les mêmes valeurs que les balises `<meta>` actuelles. Les schémas JSON-LD (Organization, BlogPosting, FAQPage, BreadcrumbList) sont passés en prop `schema` et injectés via `dangerouslySetInnerHTML`.

Le `sitemap.xml` reste généré par `generate-sitemap.js` (script Node.js actuel) et copié dans `public/`. Alternativement, installer `next-sitemap` pour générer automatiquement.

### Phase 10 — Tests et déploiement

#### Checklist avant mise en production

- [ ] Toutes les pages s'affichent correctement (design identique)
- [ ] Custom cursor fonctionnel
- [ ] Hero slider Swiper opérationnel
- [ ] Animations AOS au scroll présentes
- [ ] Menu mobile s'ouvre et se ferme correctement
- [ ] Sous-menu Services fonctionne
- [ ] Formulaire booking (Flatpickr + Formspree)
- [ ] WhatsApp float visible
- [ ] Canonical URLs corrects (pas de duplicate content)
- [ ] Sitemap.xml à jour
- [ ] Redirects vercel.json repris dans `next.config.js`
- [ ] Page `/blog/reconversion-*` s'affiche avec styles

#### Configuration Vercel pour Next.js

Les redirects actuels de `vercel.json` sont repris dans `next.config.js` :

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'rpam.fr' }],
        destination: 'https://www.rpam.fr/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
```

`cleanUrls` et `trailingSlash: false` sont gérés nativement par Next.js (les pages n'ont pas d'extension dans l'URL par défaut).

---

## 5. Ce qui ne change pas

| Élément | Statut |
|---|---|
| Tous les fichiers CSS (`vendors.min.css`, `style.min.css`, etc.) | ✅ Copiés sans modification |
| `jquery.js`, `vendors.min.js`, `main.js` | ✅ Copiés sans modification |
| CDN AOS, Swiper, Bootstrap, Flatpickr | ✅ Mêmes URLs CDN |
| Structure HTML de chaque page | ✅ Copiée (class→className seulement) |
| Animations (GSAP, Anime.js, parallax, curseur) | ✅ Pilotées par main.js inchangé |
| Images, fonts | ✅ Copiées dans public/ |
| Schémas JSON-LD SEO | ✅ Repris dans SEOHead |
| Formspree (formulaire contact) | ✅ Même endpoint |
| Sitemap.xml | ✅ Même génération |

---

## 6. Ce qui change (et pourquoi c'est sans risque)

| Élément | Changement | Impact |
|---|---|---|
| `class=` → `className=` | Obligation JSX | Aucun impact visuel |
| `<img>` → `<img />` | Obligation JSX | Aucun impact |
| `DOMContentLoaded` → `useEffect` | Même timing d'exécution | Aucun impact |
| `data-mobile-nav-style` sur body | Déplacé dans `_document.js` | Identique au résultat |
| Scripts inline → `useEffect` | Même logique, autre syntaxe | Fonctionnement identique |
| `<meta>` → composant `SEOHead` | Abstraction | Même HTML généré |

---

## 7. Risques et mitigations

### Risque 1 — main.js ne se ré-initialise pas en navigation SPA

**Probabilité :** Moyenne (surtout visible sur les pages avec parallax, splitting.js, compteurs)  
**Mitigation :** Ajouter un `useEffect` dans `_app.js` qui appelle les méthodes de ré-init disponibles après chaque navigation (`AOS.refresh()`, déclenchement d'événements jQuery custom si main.js les écoute).  
**Plan B :** Si trop d'éléments sont cassés, désactiver la navigation SPA avec `<Link legacyBehavior>` ou utiliser `router.events` pour forcer un rechargement complet. Les utilisateurs verront un rechargement de page classique — même comportement qu'aujourd'hui.

### Risque 2 — Ordre de chargement des scripts

**Probabilité :** Faible  
**Mitigation :** L'ordre `jquery.js` → `vendors.min.js` → `main.js` est garanti par Next.js avec `strategy="afterInteractive"` dans l'ordre de déclaration.

### Risque 3 — Animations absentes au premier rendu SSR

**Probabilité :** Faible (AOS se déclenche au scroll, pas au rendu)  
**Mitigation :** AOS est initialisé dans `useEffect` côté client après hydration. Le SSR génère le HTML sans classes AOS actives, ce qui est le comportement attendu (les éléments apparaissent puis AOS les anime).

### Risque 4 — Conflit entre CSS Crafto et CSS Next.js

**Probabilité :** Très faible (Next.js n'injecte pas de CSS global par défaut)  
**Mitigation :** Ne pas utiliser CSS Modules ni Tailwind. Charger tous les CSS via `<link>` dans `_document.js` uniquement.

---

## 8. Estimation du travail

| Phase | Effort estimé |
|---|---|
| 1–2 : Initialisation + copie assets | 0.5 jour |
| 3–4 : `_document.js` + `_app.js` | 0.5 jour |
| 5 : Composants (Navbar, Footer, Layout, SEOHead) | 1 jour |
| 6 : Conversion des 10 pages (HTML → JSX) | 2–3 jours |
| 7 : Tests animations + corrections SPA | 1–2 jours |
| 8 : Migration blog (Option B rapide) | 0.5 jour |
| 9–10 : SEO + tests finaux + déploiement | 1 jour |
| **Total estimé** | **6–9 jours** |

---

## 9. Recommandation finale

**Approche conseillée :** Migration progressive, page par page, en commençant par les pages simples (about, services) avant les pages complexes (index avec Swiper, booking avec Flatpickr).

**Ne pas migrer d'un coup :** Tester chaque page dans un environnement de prévisualisation Vercel avant de mettre en production.

**Blog :** Démarrer avec l'Option B (fichiers HTML dans public/) pour zéro risque, puis migrer vers MDX page par page au fil des nouveaux articles publiés.

**CSS et JS : ne jamais modifier les fichiers originaux.** Tout l'effort de migration est dans la structure React (JSX, composants, hooks), pas dans les assets.

---

*Document rédigé le 16 mai 2026 — à réviser avant le début effectif de la migration.*
