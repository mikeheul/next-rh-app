import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const employees = [
        {
            firstName: 'Virgile',
            lastName: 'GIBELLO',
            email: 'virgile@exemple.com',
            position: 'IT Master',
            startDate: new Date('2021-08-01'),
            status: 'in progress',
        },
        {
            firstName: 'Vincent',
            lastName: 'VEGA',
            email: 'vincent@exemple.com',
            position: 'CEO',
            startDate: new Date('2000-01-15'),
            status: 'completed',
        },
    ];

    for (const employee of employees) {
        await prisma.employee.create({
            data: employee,
        });
    }

    console.log('Base de données peuplée avec succès !');
}

// Lancer la fonction main
main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
