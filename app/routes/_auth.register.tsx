import { z } from 'zod';
import { prisma } from '../utils/db.server'
import { DataFunctionArgs, json } from '@remix-run/node';
const RegisterSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Email is invalid'),
    firstName: z.string({required_error: 'First name is required'}),
    lastName: z.string({required_error: 'Last name is required'}),

})
export async function loader({ params }: DataFunctionArgs) {
    const user = await prisma.user.findFirst();

    return json(user)
}
export default function RegisterRoute() {
    return (
        <div>Register Route</div>
    )
}