// Middleware Vercel Edge — simplifié après migration vers articles statiques
// Le prérendu Hashnode a été supprimé : les articles sont désormais des fichiers HTML statiques

export default function middleware(request) {
    // Aucun traitement spécial requis
    return;
}

export const config = {
    matcher: []
};
