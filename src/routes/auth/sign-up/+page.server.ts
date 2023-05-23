import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { ENABLE_CONFIRMATION_EMAIL } from '$env/static/private';
import { auth } from '$lib/server/lucia';
import { userSchema } from '$lib/config/zod-schemas';
import { sendVerificationEmail } from '$lib/config/email-messages';
import prisma from '$lib/config/prisma';

const signUpSchema = userSchema.pick({
	firstName: true,
	lastName: true,
	displayName: true,
	email: true,
	password: true,
	terms: true
});

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (session) throw redirect(302, '/dashboard');
	const form = await superValidate(event, signUpSchema);
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, signUpSchema);
		//console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		//add user to db
		try {
			console.log('creating user');
			const token = crypto.randomUUID();

			const user = await auth.createUser({
				primaryKey: {
					providerId: 'emailpassword',
					providerUserId: form.data.email,
					password: form.data.password
				},
				attributes: {
					email: form.data.email,
					firstName: form.data.firstName,
					lastName: form.data.lastName,
					displayName: form.data.displayName,
					role: 'USER',
					verified: false,
					receiveEmail: true,
					token: token
				}
			});

			if (ENABLE_CONFIRMATION_EMAIL == 'true') {
				console.log('sending email');
				await sendVerificationEmail(form.data.email, token);
			} else {
				console.log('email verification disabled');
				await prisma.authUser.update({
					where: {
						token: token
					},
					data: {
						verified: true
					}
				});
			}
			//await sendVerificationEmail(form.data.email, token);
			const session = await auth.createSession(user.userId);
			event.locals.auth.setSession(session);
		} catch (e) {
			console.error(e);
			// email already in use
			//might be other type of error but this is most common and this is how lucia docs sets the error to duplicate user
			return setError(form, 'email', 'A user with that email already exists.');
		}

		return { form };
	}
};
