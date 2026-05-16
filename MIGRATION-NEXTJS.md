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

## 10. Prompts Claude à exécuter pendant la migration

> Ces prompts sont conçus pour être copiés-collés directement dans Claude Code.  
> Ouvrir le dossier `rpam-client-next/` dans Claude Code avant de commencer.  
> Exécuter les prompts **dans l'ordre**, phase par phase.

---

### PHASE 1 — Initialisation du projet

**Prompt 1.1 — Créer le projet Next.js**

```
Crée un nouveau projet Next.js dans le dossier rpam-client-next/ en utilisant le Pages Router (pas l'App Router), sans TypeScript, sans Tailwind, sans ESLint, sans le dossier src/. 

Installe ensuite les dépendances : next-mdx-remote et gray-matter.

Crée aussi un next.config.js minimal avec :
- trailingSlash: false
- Un redirect permanent de rpam.fr vers www.rpam.fr pour tous les chemins

Ne crée aucune page ni composant pour l'instant.
```

---

### PHASE 2 — Copie des assets

**Prompt 2.1 — Copier CSS, JS, images**

```
Dans le projet rpam-client-next/, copie les dossiers suivants depuis ../rpam-client/ vers public/ en conservant exactement la même structure :
- css/ → public/css/
- js/ → public/js/
- images/ → public/images/
- fonts/ → public/fonts/

Copie aussi ces fichiers à la racine de public/ :
- sitemap.xml
- robots.txt
- llms.txt

Ne modifie aucun fichier copié. Vérifie que tous les fichiers sont bien présents après la copie.
```

---

### PHASE 3 — Structure HTML globale

**Prompt 3.1 — Créer _document.js**

```
Dans rpam-client-next/pages/_document.js, crée le document Next.js en te basant sur le <head> de ../rpam-client/index.html.

Le _document.js doit :
1. Mettre lang="fr" sur <Html>
2. Charger dans <Head> tous les CSS dans cet ordre exact :
   - Google Fonts Montserrat (preconnect + stylesheet)
   - /css/vendors.min.css
   - /css/icon.min.css
   - /css/style.min.css
   - /css/responsive.min.css
   - /css/corporate.css
   - /css/navbar-modern.css
   - /css/pages.css
   - CDN AOS 2.3.1 CSS
   - CDN Bootstrap Icons 1.11.1 CSS
   - CDN Swiper 11 CSS
   - CDN Flatpickr CSS
   - Favicon /images/favicon-32x32.png
3. Mettre sur <body> : className="custom-cursor" et data-mobile-nav-style="classic"

N'ajoute aucun CSS de Next.js par défaut. Supprime globals.css si Next.js l'a créé.
```

**Prompt 3.2 — Créer _app.js**

```
Dans rpam-client-next/pages/_app.js, crée le fichier App qui :
1. Charge les scripts JS avec next/script strategy="afterInteractive" dans cet ordre impératif :
   /js/jquery.js → /js/vendors.min.js → /js/main.js → Bootstrap 5.3.3 CDN → Swiper 11 CDN → AOS 2.3.1 CDN → Flatpickr CDN
2. Ajoute un useEffect (sans dépendances, qui s'exécute à chaque navigation) qui appelle AOS.refresh() si AOS est défini
3. Supprime tout import CSS — les CSS sont déjà dans _document.js

L'ordre des scripts est critique : ne pas les réorganiser.
```

---

### PHASE 4 — Composants réutilisables

**Prompt 4.1 — Créer le composant Navbar**

```
Lis le fichier ../rpam-client/index.html et extrait exactement le bloc <nav class="navbar-modern"> et le bloc <div class="mobile-menu-modern"> dans un composant rpam-client-next/components/Navbar.jsx.

Règles de conversion HTML → JSX :
- class= devient className=
- Les balises auto-fermantes sans contenu (img, br, input, hr) prennent un /
- Les attributs data-* et aria-* restent identiques
- Les commentaires HTML <!-- --> deviennent {/* */}
- Ne change rien d'autre

Le composant reçoit une prop activePage (string). Ajoute la classe "active" sur le <a> correspondant à la page active (utilise une condition activePage === 'home' pour le lien /, activePage === 'about' pour /about, etc.).

Ne déplace aucun script inline dans ce composant — ils restent dans main.js.
```

**Prompt 4.2 — Créer le composant Footer**

```
Lis ../rpam-client/index.html et extrait le bloc <footer class="footer-dark"> dans rpam-client-next/components/Footer.jsx.

Mêmes règles de conversion HTML → JSX que pour Navbar. Aucune logique dynamique, c'est du JSX pur.
```

**Prompt 4.3 — Créer le composant Layout**

```
Crée rpam-client-next/components/Layout.jsx qui :
1. Importe et affiche Navbar (avec la prop activePage) et Footer
2. Affiche {children} entre les deux
3. Ajoute après Footer le bouton WhatsApp flottant (copie le HTML depuis ../rpam-client/index.html, converti en JSX)
4. Contient un useEffect qui initialise AOS.init({ duration: 800, easing: 'ease-out', once: true, offset: 50 }) si AOS est défini dans window

Le composant accepte les props : children et activePage.
```

**Prompt 4.4 — Créer le composant SEOHead**

```
Crée rpam-client-next/components/SEOHead.jsx avec next/head qui accepte ces props :
- title (string)
- description (string)  
- canonical (string, URL complète)
- ogImage (string, optionnel, URL complète)
- ogType (string, défaut "website")
- schema (object ou array, optionnel — injecté en JSON-LD via dangerouslySetInnerHTML)

Il doit générer toutes les balises meta Open Graph, Twitter Card, et canonical présentes dans les fichiers HTML actuels (consulte ../rpam-client/index.html pour voir le pattern complet).
```

---

### PHASE 5 — Conversion des pages simples

> Pour chaque page simple, utiliser ce prompt en remplaçant le nom de la page.

**Prompt 5.x — Template de conversion d'une page**

```
Lis ../rpam-client/about.html dans son intégralité.

Crée rpam-client-next/pages/about.jsx qui :
1. Utilise le composant Layout avec activePage="about"
2. Utilise SEOHead avec exactement les mêmes valeurs que les balises <title>, <meta name="description">, <link rel="canonical">, og:*, twitter:* et les JSON-LD du fichier HTML
3. Contient dans le JSX le contenu du <body> de about.html, SAUF la Navbar, le Footer et le bouton WhatsApp (déjà dans Layout)
4. Respecte les règles de conversion HTML → JSX (class→className, balises self-closing, commentaires)
5. Si le fichier HTML a des scripts inline <script>, déplace-les dans un useEffect. Si ces scripts utilisent jQuery ($), entoure-les de if (typeof window !== 'undefined' && window.$) { ... }

Ne modifie pas le contenu textuel, ne réorganise pas les sections, ne renomme pas les classes CSS.
```

**Répéter ce prompt pour chaque page en changeant le nom :**
- `about.html` → `pages/about.jsx` (activePage="about")
- `services.html` → `pages/services.jsx` (activePage="services")
- `guidance.html` → `pages/guidance.jsx` (activePage="services")
- `up-training.html` → `pages/up-training.jsx` (activePage="services")
- `job-getting.html` → `pages/job-getting.jsx` (activePage="services")
- `news.html` → `pages/news.jsx` (activePage="news")

---

### PHASE 6 — Pages complexes

**Prompt 6.1 — Page d'accueil (index.jsx)**

```
Lis ../rpam-client/index.html dans son intégralité.

Crée rpam-client-next/pages/index.jsx en suivant les mêmes règles que les pages simples, avec ces spécificités supplémentaires :

1. Le Swiper hero slider : dans le useEffect, initialise Swiper après avoir vérifié que window.Swiper est défini. Utilise les mêmes options que dans le script inline actuel du HTML.

2. Les compteurs (CountTo) et autres effets numériques : s'ils sont initialisés dans un script inline, place-les aussi dans le useEffect avec vérification window.$.

3. N'initialise PAS AOS ici — il est déjà initialisé dans Layout.jsx.

4. Conserve les attributs data-aos, data-swiper-*, data-parallax-* sur tous les éléments JSX — ils sont lus par main.js et les librairies CDN.
```

**Prompt 6.2 — Page booking**

```
Lis ../rpam-client/booking.html dans son intégralité.

Crée rpam-client-next/pages/booking.jsx en suivant les règles standard, avec ces spécificités :

1. Flatpickr (date picker) : dans le useEffect, initialise flatpickr sur les inputs de date après vérification window.flatpickr. Utilise les mêmes options que dans le script inline actuel.

2. Le formulaire utilise Formspree (fetch vers formspree.io). Conserve exactement la même logique de soumission dans le useEffect ou dans un handler onSubmit React (au choix, mais ne pas changer l'endpoint ni les champs).

3. Conserve tous les attributs de validation HTML natifs (required, type, pattern) sur les inputs.
```

---

### PHASE 7 — Blog

**Prompt 7.1 — Page liste des articles (/blogs)**

```
Lis ../rpam-client/blogs.html dans son intégralité.

Crée rpam-client-next/pages/blogs.jsx en suivant les règles standard.

En plus, crée rpam-client-next/content/articles.js avec un tableau d'objets exporté. Pour l'instant, il contient un seul article :
{
  slug: 'reconversion-professionnelle-30-40-50-ans',
  title: 'Reconversion professionnelle à 30, 40 ou 50 ans : par où commencer en 2025 ?',
  excerpt: 'Guide complet pour réussir votre reconversion professionnelle à tout âge...',
  date: '2025-05-11',
  readTime: 10,
  coverImage: '/images/blog/reconversion-professionnelle-cover.jpg',
  tags: ['Reconversion', 'Bilan de compétences', 'CPF'],
}

Dans blogs.jsx, importe ce tableau et génère les cartes d'articles dynamiquement à partir du tableau plutôt qu'en dur dans le HTML.
```

**Prompt 7.2 — Articles de blog statiques**

```
Copie le dossier ../rpam-client/blog/ dans rpam-client-next/public/blog/.

Ensuite, dans rpam-client-next/pages/blog/[slug].jsx, crée une page qui :
1. Utilise getStaticPaths pour retourner les slugs disponibles (pour l'instant juste 'reconversion-professionnelle-30-40-50-ans')
2. Utilise getStaticProps pour passer le slug à la page
3. Dans le rendu, affiche un lien vers le fichier HTML statique dans public/blog/ via une redirection côté client (window.location) ou un composant qui charge le contenu

Note : pour l'instant, l'approche la plus simple est que /blog/[slug] redirige simplement vers le fichier HTML statique dans public/. On migrera vers MDX plus tard quand on aura plus d'articles.

Alternative plus propre : laisse les fichiers HTML dans public/blog/ et supprime la page [slug].jsx — Vercel servira les fichiers HTML directement depuis public/ avec les bonnes URLs.
```

---

### PHASE 8 — Vérification des animations

**Prompt 8.1 — Diagnostic animations**

```
Le projet Next.js est maintenant en place. Lance le serveur de développement et vérifie les points suivants en lisant le code des composants et pages :

1. Dans _app.js, vérifie que l'ordre des scripts est : jquery.js → vendors.min.js → main.js → Bootstrap → Swiper → AOS → Flatpickr. Si l'ordre est différent, corrige-le.

2. Dans Layout.jsx, vérifie que AOS.init() est dans un useEffect avec tableau de dépendances vide [].

3. Dans chaque page qui avait un <script> inline avec $(document).ready() ou document.addEventListener('DOMContentLoaded'), vérifie que le code est maintenant dans un useEffect avec if (typeof window !== 'undefined' && window.$) { ... }.

4. Vérifie que tous les attributs data-aos="fade-up", data-aos-delay="...", data-aos-duration="..." sont bien présents dans le JSX des pages converties (ils ne doivent pas avoir été supprimés lors de la conversion).

5. Vérifie que <body> dans _document.js a bien className="custom-cursor" et data-mobile-nav-style="classic".

Signale tout ce qui est manquant ou mal placé.
```

**Prompt 8.2 — Correction navigation SPA**

```
En Next.js, quand l'utilisateur navigue entre les pages sans rechargement complet, main.js ne se ré-exécute pas. Cela peut causer des animations manquantes sur les nouvelles pages visitées.

Dans _app.js, utilise router.events de next/router pour écouter l'événement routeChangeComplete et appeler :
- AOS.refresh() si window.AOS est défini
- Si window.$ est défini et que main.js expose une fonction d'init globale, l'appeler aussi

Assure-toi que l'écoute de l'événement est nettoyée dans le return du useEffect pour éviter les fuites mémoire.
```

---

### PHASE 9 — SEO et sitemap

**Prompt 9.1 — Vérification des métadonnées SEO**

```
Parcours toutes les pages dans rpam-client-next/pages/ et vérifie pour chacune que :
1. Le composant SEOHead est présent avec title, description et canonical corrects
2. Le canonical correspond exactement à l'URL de production (https://www.rpam.fr/...) et non à une URL relative
3. Les schémas JSON-LD (Organization, Service, FAQPage, BreadcrumbList, BlogPosting) sont passés en prop schema et sont identiques à ceux des fichiers HTML originaux dans ../rpam-client/
4. Les balises og:image pointent vers des URLs absolues avec le domaine complet

Pour chaque écart trouvé, corrige-le directement.
```

**Prompt 9.2 — Sitemap**

```
Dans rpam-client-next/, adapte le fichier ../rpam-client/generate-sitemap.js pour qu'il génère le sitemap.xml dans public/sitemap.xml au lieu de la racine.

Ajoute aussi un script npm "sitemap" dans package.json qui exécute ce fichier.

Ensuite, vérifie que public/robots.txt pointe vers https://www.rpam.fr/sitemap.xml.
```

---

### PHASE 10 — Tests finaux avant déploiement

**Prompt 10.1 — Checklist pré-déploiement**

```
Effectue une vérification complète du projet rpam-client-next/ avant déploiement :

Structure :
- [ ] pages/_document.js existe et contient tous les CSS dans le bon ordre
- [ ] pages/_app.js charge les scripts JS dans le bon ordre (jquery → vendors → main)
- [ ] Tous les fichiers CSS sont dans public/css/ et non modifiés
- [ ] Tous les fichiers JS sont dans public/js/ et non modifiés
- [ ] public/images/ contient toutes les images du site original
- [ ] public/sitemap.xml est à jour
- [ ] public/robots.txt est présent

Pages :
- [ ] pages/index.jsx existe
- [ ] pages/about.jsx existe
- [ ] pages/services.jsx existe
- [ ] pages/guidance.jsx existe
- [ ] pages/up-training.jsx existe
- [ ] pages/job-getting.jsx existe
- [ ] pages/booking.jsx existe
- [ ] pages/blogs.jsx existe
- [ ] pages/news.jsx existe

SEO :
- [ ] Chaque page a un composant SEOHead avec title, description et canonical
- [ ] Les schémas JSON-LD sont présents dans chaque page concernée

Animations :
- [ ] _document.js : body a className="custom-cursor" et data-mobile-nav-style="classic"
- [ ] Layout.jsx : useEffect avec AOS.init()
- [ ] _app.js : useEffect avec AOS.refresh() sur routeChangeComplete

Signale tout ce qui manque et propose une correction.
```

**Prompt 10.2 — Déploiement Vercel**

```
Le projet est prêt pour le déploiement. 

Dans vercel.json à la racine de rpam-client-next/, crée un fichier minimal avec :
- Le redirect permanent de rpam.fr vers www.rpam.fr (même règle qu'actuellement)

Crée aussi un commit git avec le message "Initial Next.js migration — static site preserved" et pousse sur la branche main.

Note : le redirect /:path*.html → /:path* et cleanUrls ne sont plus nécessaires car Next.js gère nativement les URLs sans extension.
```

---

### Prompts utilitaires (à utiliser à tout moment)

**Pour déboguer une animation manquante**

```
Sur la page [NOM DE LA PAGE], l'animation [DESCRIPTION] ne fonctionne plus en Next.js.

Dans ../rpam-client/[PAGE].html, retrouve le script inline qui initialisait cet effet. Vérifie dans pages/[PAGE].jsx si ce code a bien été déplacé dans un useEffect. Si ce n'est pas le cas, ajoute-le avec une vérification typeof window !== 'undefined'.
```

**Pour ajouter un nouvel article de blog**

```
Ajoute un nouvel article de blog avec les informations suivantes :
- Slug : [SLUG]
- Titre : [TITRE]
- Date : [DATE]
- Temps de lecture : [X] min
- Image de couverture : /images/blog/[NOM-IMAGE].jpg
- Tags : [TAG1, TAG2]
- Extrait : [DESCRIPTION COURTE]

1. Ajoute l'entrée dans content/articles.js
2. Crée le fichier HTML statique public/blog/[SLUG].html en suivant exactement la structure de public/blog/reconversion-professionnelle-30-40-50-ans.html, mais avec le nouveau contenu
3. Mets à jour generate-sitemap.js avec le nouvel article
4. Régénère public/sitemap.xml
```

**Pour convertir un article HTML existant en MDX**

```
Convertis l'article public/blog/[SLUG].html en fichier MDX content/blog/[SLUG].mdx.

Le frontmatter doit contenir : title, description, date, coverImage, tags, readTime, canonical.

Le contenu HTML de l'article doit être converti en Markdown propre. Les balises <h2>, <h3>, <ul>, <ol>, <p>, <strong>, <em> sont converties en Markdown standard. Les <div class="alert"> et les boîtes CTA sont conservées en HTML dans le fichier MDX (MDX accepte le HTML inline).

Ensuite, adapte pages/blog/[slug].jsx pour lire depuis content/blog/ avec next-mdx-remote et getStaticProps.
```

---

*Document rédigé le 16 mai 2026 — à réviser avant le début effectif de la migration.*
