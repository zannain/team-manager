import { singleton } from './singleton.server'
import { PrismaClient } from '@prisma/client'

export const prisma = singleton('prisma', () => {
    const client = new PrismaClient();
    client.$connect()
	return client
});
