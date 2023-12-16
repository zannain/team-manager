import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { DataFunctionArgs, json } from "@remix-run/node";
import { authSessionStorage } from "./utils/session.server";



export async function loader({ request }: DataFunctionArgs) {
  const userCookieSession = await authSessionStorage.getSession(request.headers.get('cookie'));
  const user = userCookieSession.get('user');

  return json(
		{
      user
    })
}
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
