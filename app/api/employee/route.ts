import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const employees = await db.employee.findMany({
            orderBy: {
                lastName: 'asc'
            }
        });

        return NextResponse.json(employees);

    } catch (error) {
        console.log("[EMPLOYEES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {

        const { firstName, lastName, email, position, startDate } = await req.json();

        console.log(req.json())

        // Valider les données (facultatif, mais recommandé)
        if (!firstName || !lastName || !email || !position || !startDate) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Créer le livre dans la base de données MongoDB via Prisma
        const employee = await db.employee.create({
            data: {
                firstName, 
                lastName, 
                email, 
                position, 
                startDate,
                status: 'pending'
            }
        });

        // Répondre avec l'eployé créé
        return NextResponse.json(employee, { status: 201 });

    } catch (error) {
        console.error('Error adding employee:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}