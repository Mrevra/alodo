const prisma = require('../prisma');

const createTransaction = async (data) => {
    const { type, amount, description, userId } = data;

    // Verification simple
    if (!type || !amount || !userId) {
        const error = new Error('type, amount, et userId sont requis');
        error.status = 400;
        throw error;
    }

    // Create user info if it doesn't exist (Simulation for hackathon)
    let user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        // We create a dummy user
        user = await prisma.user.create({
            data: {
                id: userId,
                phone: 'Simulated_' + Math.random().toString().slice(2, 10),
                name: 'Utilisateur ' + userId,
            }
        });
    }

    return await prisma.transaction.create({
        data: {
            type,
            amount: parseFloat(amount),
            description,
            userId,
        },
    });
};

const getTransactionsByUser = async (userId) => {
    return await prisma.transaction.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
    });
};

const getDashboardStats = async (userId) => {
    const transactions = await prisma.transaction.findMany({
        where: { userId },
    });

    let totalVentes = 0;
    let totalAchats = 0;
    let totalDettes = 0;
    let totalRemboursements = 0;

    transactions.forEach((t) => {
        switch (t.type) {
            case 'VENTE':
                totalVentes += t.amount;
                break;
            case 'ACHAT':
                totalAchats += t.amount;
                break;
            case 'DETTE':
                totalDettes += t.amount;
                break;
            case 'REMBOURSEMENT':
                totalRemboursements += t.amount;
                break;
        }
    });

    const profit = totalVentes - totalAchats;
    const dettesEnCours = totalDettes - totalRemboursements;

    return {
        totalVentes,
        totalDepenses: totalAchats,
        profit,
        dettesEnCours,
    };
};

module.exports = {
    createTransaction,
    getTransactionsByUser,
    getDashboardStats,
};
