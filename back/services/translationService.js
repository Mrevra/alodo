const fonDictionary = {
    'bonjour': 'kuabo',
    'merci': 'awalé',
    'vente': 'sisa',
    'achat': 'xixo',
    'dette': 'agba',
    'remboursement': 'dodo',
    'argent': 'akwé'
};

const yorubaDictionary = {
    'bonjour': 'e kaaro',
    'merci': 'ese',
    'vente': 'tita',
    'achat': 'ra',
    'dette': 'gbese',
    'remboursement': 'idupe',
    'argent': 'owo'
};

const translateContext = async (texte, cible) => {
    // Simulation de traduction (Dictionnaire simple)
    let dictionary = cible.toLowerCase() === 'fon' ? fonDictionary : yorubaDictionary;
    let words = texte.toLowerCase().split(' ');

    const result = words.map(word => {
        // Nettoyer la ponctuation simple si necessaire
        const cleanWord = word.replace(/[^a-zA-ZÀ-ÿ]/g, '');
        return dictionary[cleanWord] ? dictionary[cleanWord] : word;
    });

    return result.join(' ');
};

module.exports = {
    translateContext
};
