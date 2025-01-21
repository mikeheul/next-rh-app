import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const employees = [
        {
            firstName: 'Marie',
            lastName: 'LEROY',
            email: 'marie@exemple.com',
            position: 'HR',
            startDate: new Date('2020-08-01'),
            status: 'in-progress',
        },
        {
            firstName: 'John',
            lastName: 'DOE',
            email: 'john@exemple.com',
            position: 'Developer',
            startDate: new Date('2022-01-15'),
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
