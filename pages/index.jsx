import Layout from '../components/Layout'
import SEOHead from '../components/SEOHead'

const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RPAM",
  "url": "https://www.rpam.fr",
  "logo": "https://www.rpam.fr/images/logo-rpam.png",
  "description": "RPAM est un cabinet de coaching professionnel en France spécialisé en bilan de compétences, reconversion professionnelle, formation sur mesure et coaching emploi.",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@rpam.fr",
    "contactType": "customer service",
    "areaServed": "FR",
    "availableLanguage": "French"
  },
  "sameAs": [
    "https://www.facebook.com/",
    "https://www.linkedin.com",
    "https://www.instagram.com"
  ]
}

export default function Home() {
  return (
    <Layout activePage="home">
      <SEOHead
        title="RPAM – Coaching professionnel, bilan de compétences et orientation | France"
        description="RPAM : cabinet de coaching professionnel en France. Bilan de compétences, reconversion, coaching emploi et formation sur mesure. Consultation gratuite — réponse sous 24h."
        canonical="https://www.rpam.fr"
        schema={schema}
      />
      {/* Le contenu complet de la page d'accueil sera migré ici */}
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Migration en cours — page d&apos;accueil à convertir</p>
      </div>
    </Layout>
  )
}
