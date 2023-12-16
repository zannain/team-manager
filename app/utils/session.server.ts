import { createCookieSessionStorage } from '@remix-run/node'

export const authSessionStorage = createCookieSessionStorage({
    cookie: {
        name: 'st_session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: process.env.SESSION_SECRET.split(','),
		secure: process.env.NODE_ENV === 'production',
    }
})