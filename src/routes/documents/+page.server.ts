import { redirect, error } from '@sveltejs/kit';

import prisma from '$lib/config/prisma.js';
import { documentSchema, documentsSchema, type Document } from '$lib/config/zod-schemas.js';

export const load = async (event) => {
	const { user } = await event.locals.auth.validateUser();
	if (!user) throw redirect(302, '/auth/sign-in');
	if (!user.verified) throw redirect(302, '/auth/verify/email');

	const documents = await prisma.document.findMany({
		select: {
			id: true,
			name: true,
			docType: true,

			auth_user: {
				select: {
					displayName: true,
					role: true
				}
			}
		}
	});

	return {
		documents
	};
};
