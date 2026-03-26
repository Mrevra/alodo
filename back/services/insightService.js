const getInsights = async (userId) => {
    // Simulation: En production, on utiliserait un moteur de règles 
    // ou une IA connectée aux données sectorielles de l'utilisateur.

    const insightsList = [
        {
            messageMarche: 'Le prix du maïs augmente sur le marché de Dantokpa cette semaine.',
            recommandationAdaptee: 'Vous devriez peut-être mettre à jour vos prix de vente ou faire du stock.'
        },
        {
            messageMarche: 'La demande pour les services de livraison est en forte hausse avec la fin d\'année.',
            recommandationAdaptee: 'Pensez à proposer un service de livraison à vos clients habituels.'
        },
        {
            messageMarche: 'Les taux de micro-crédits sont actuellement favorables pour les artisans.',
            recommandationAdaptee: 'C\'est le bon moment de demander un financement pour acheter de nouveaux équipements.'
        }
    ];

    // Return a random insight for the hackathon demo
    const randomIndex = Math.floor(Math.random() * insightsList.length);
    return insightsList[randomIndex];
};

module.exports = {
    getInsights
};
