import prisma from '$lib/config/prisma.js';
import { redirect, error } from '@sveltejs/kit';

export const load = async (event) => {
	const { user } = await event.locals.auth.validateUser();
	if (!user) throw redirect(302, '/auth/sign-in');
	if (!user.verified) throw redirect(302, '/auth/verify/email');

	if (user.role !== 'ADMIN') throw error(403, 'Forbidden');

	const allUsers = prisma.authUser.findMany({
		select: {
			id: true,
			firstName: true,
			lastName: true,
			displayName: true,
			email: true,
			role: true,
			verified: true,
			receiveEmail: true,
			createdAt: true,
			updatedAt: true
		}
	});

	return {
		user,
		allUsers
	};
};
