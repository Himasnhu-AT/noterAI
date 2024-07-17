const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            id: '12jfkld',
            name: 'Demo User',
            userName: 'demo',
            email: 'demo@gmail.com',
            // password: Hello@12
            password: '$2b$10$QKIKdTLN3Ud8BSJuuJxhHuLisoVuiFC7HiTc64CbZB/qpHw8gB1bm',
            token: '123456',
            isVerified: true,
            settings: {
                create: {
                    emailSubscription: {
                        create: {}
                    }
                }
            }
        }
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });