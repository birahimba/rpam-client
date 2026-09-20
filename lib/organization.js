// Entité Organization du site, déclarée une seule fois et référencée partout.
//
// Enjeu : le sigle « RPAM » est déjà porté en France par les Relais Parents
// Assistantes Maternelles (service public de la petite enfance), et des marques
// au nom proche occupent les mêmes résultats. Les moteurs — classiques comme
// génératifs — ne rattachent une marque à une activité que s'ils retrouvent la
// même entité, sous le même identifiant, reliée à des profils vérifiables.
//
// D'où trois partis pris :
//   1. un @id stable, que toutes les pages réutilisent par référence plutôt que
//      de redéclarer un Organization anonyme — un seul nœud, pas quinze homonymes ;
//   2. le nom complet porté par legalName et alternateName, car « Réseau
//      Professionnel Arvy Motivation » est la seule chaîne de marque qui nous
//      appartienne réellement ;
//   3. sameAs limité aux profils réellement contrôlés par RPAM : un lien mort ou
//      non vérifiable y affaiblit le signal au lieu de le renforcer.

import { SITE_URL } from './site'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Référence à l'entité, à utiliser comme publisher/provider/author dans les autres schémas. */
export const ORGANIZATION_REF = { "@id": ORGANIZATION_ID }

// Profils officiels. N'ajouter ici qu'un profil actif et administré par RPAM
// (Google Business Profile, fiche SIREN, YouTube, Instagram… une fois créés).
const SAME_AS = [
  "https://www.linkedin.com/company/rpam",
  "https://www.facebook.com/RPAMConnect",
]

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  "name": "RPAM",
  "legalName": "Réseau Professionnel Arvy Motivation",
  "alternateName": "Réseau Professionnel Arvy Motivation",
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/images/logo-rpam.png`,
  },
  "image": `${SITE_URL}/images/og-rpam.jpg`,
  "description":
    "RPAM (Réseau Professionnel Arvy Motivation) est un cabinet français de coaching professionnel " +
    "spécialisé en bilan de compétences, reconversion professionnelle, formation sur mesure et coaching emploi.",
  // Lève l'ambiguïté du sigle sans nommer d'autre marque : on décrit ce que RPAM
  // est, et le seul homonyme que le public rencontre réellement en cherchant.
  "disambiguatingDescription":
    "Cabinet privé de coaching et d'orientation professionnelle pour adultes. À ne pas confondre avec " +
    "les Relais Parents Assistantes Maternelles (RPAM, RPE), service public de la petite enfance.",
  "areaServed": { "@type": "Country", "name": "France" },
  "knowsAbout": [
    "Bilan de compétences",
    "Reconversion professionnelle",
    "Orientation professionnelle",
    "Coaching emploi",
    "Optimisation de CV et ATS",
    "Formation professionnelle",
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@rpam.fr",
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": "French",
  },
  "sameAs": SAME_AS,
}

const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  "url": SITE_URL,
  "name": "RPAM – Réseau Professionnel Arvy Motivation",
  "inLanguage": "fr-FR",
  "publisher": ORGANIZATION_REF,
}

/** Graphe d'identité injecté sur toutes les pages par pages/_app.js. */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema],
}
