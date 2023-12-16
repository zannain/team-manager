import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.deleteMany();

await prisma.user.create({
	data: {
		email: 'zannainshafi@gmail.com',
		username: 'zshafi',
		firstName: 'Zannain',
		lastName: 'Shafi',
	},
})