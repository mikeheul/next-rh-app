import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

type Props = {
    params: Promise<{ employeeId: string }>
}

export async function GET(req: Request, { params }: Props) {
    
    const { employeeId } = await params;

    try {
        const employee = await db.employee.findUnique({
            where: {
                id: employeeId,
            },
        });

        if (!employee) {
            return NextResponse.json({ message: 'Employé non trouvé' }, { status: 404 });
        }

        return NextResponse.json(employee);
    } catch (error) {
        console.error('Erreur lors de la récupération de cet employé :', error);
        return NextResponse.json({ message: 'Erreur interne' }, { status: 500 });
    }
}