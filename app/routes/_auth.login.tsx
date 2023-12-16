import { type DataFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData } from '@remix-run/react';
import { z } from 'zod';
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { conform, useForm } from "@conform-to/react";
import { authSessionStorage } from "~/utils/session.server";
import { prisma } from '../utils/db.server'

const LoginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email('Email is invalid')
        .transform(value => value.toLowerCase()),
	password: z
        .string({ required_error: 'Password is required' }),
})

export async function action({ request }: DataFunctionArgs) {
    const formData = await request.formData();
	const submission = await parse(formData, {
		schema: intent => LoginSchema.transform(async (data, ctx) => {
            if (intent !== 'submit') return { ...data, user: null }
            const user = await prisma.user.findUnique({
                select: { id: true },
                where: { email: data.email },
            })
            if (!user) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Invalid email or password',
                })
                return z.NEVER
            }
            return { ...data, user }

        }),
	});
	delete submission.payload.password;

    if (submission.intent !== 'submit') {
		return json({ status: 'idle', submission } as const)
	}

	if (!submission.value?.user) {
		return json({ status: 'error', submission } as const, {
			status: 400,
		})
	}
	const { user } = submission.value
	const cookieSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	cookieSession.set('userId', user.id)
    return redirect('/', {
		headers: {
			'set-cookie': await sessionStorage.commitSession(cookieSession),
		},
	})
}


export default function LoginRoute() {
    const lastSubmission = useActionData<typeof action>();

    const [form, fields] = useForm({
		id: 'login-form',
		constraint: getFieldsetConstraint(LoginSchema),
		lastSubmission: lastSubmission?.submission,
		onValidate({ formData }) {
			return parse(formData, { schema: LoginSchema })
		},
	})
    return (
        <Form method="post" {...form.props}>
            <div>
                <label htmlFor={fields.email.id}>Email</label>
                <input {...conform.input(fields.email, {type: 'email'})} />
                <div id={fields.email.errorId}>{fields.email.errors}</div>
            </div>

            <div>
                <label htmlFor={fields.password.id}>Password</label>
                <input {...conform.input(fields.password, { type: 'password' })} />
                <div id={fields.password.errorId}>{fields.password.errors}</div>
            </div>

            <button type="submit">Login</button>
        </Form>
    )
}