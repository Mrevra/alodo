const prisma = require('../prisma');

const recordTransaction = async (phone, type, amount) => {
    // Find or create user via phone number
    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
        user = await prisma.user.create({ data: { phone } });
    }

    // Record the transaction
    await prisma.transaction.create({
        data: {
            type,
            amount: parseFloat(amount),
            userId: user.id,
        },
    });
};

const getEngineStats = async (phone) => {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) return { totalVentes: 0, totalDepenses: 0, profit: 0, dettes: 0 };

    const transactions = await prisma.transaction.findMany({
        where: { userId: user.id },
    });

    let totalVentes = 0;
    let totalDepenses = 0;
    let dettes = 0;

    transactions.forEach((t) => {
        if (t.type === 'VENTE') totalVentes += t.amount;
        if (t.type === 'ACHAT') totalDepenses += t.amount;
        if (t.type === 'DETTE') dettes += t.amount;
    });

    const profit = totalVentes - totalDepenses;

    return { totalVentes, totalDepenses, profit, dettes };
};

module.exports = {
    recordTransaction,
    getEngineStats
};
