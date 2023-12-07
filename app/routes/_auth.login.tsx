import { DataFunctionArgs } from "@remix-run/node";
import { Form } from '@remix-run/react'
export async function action({ request }: DataFunctionArgs) {

}
export default function LoginRoute() {
    return (
        <Form>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" />
            </div>

            <button type="submit">Login</button>
        </Form>
    )
}