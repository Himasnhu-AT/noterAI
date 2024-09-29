const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reset() {
    try {
        await prisma.user.deleteMany();
        await prisma.userSettings.deleteMany();
        await prisma.emailsSubscription.deleteMany();
        console.info('The data in the db has been reset');
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
    }
}

reset();