import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate, message } from 'sveltekit-superforms/server';
import { auth } from '$lib/server/lucia';
import { userSchema } from '$lib/config/zod-schemas';
import { updateEmailAddressSuccessEmail } from '$lib/config/email-messages';
import prisma from '$lib/config/prisma';

const profileSchema = userSchema.pick({
	firstName: true,
	lastName: true,
	displayName: true
});

export const load = async (event) => {
	const session = await event.locals.auth.validate();
	if (!session) throw redirect(302, '/auth/sign-in');
	const form = await superValidate(event, profileSchema);
	const { user } = await event.locals.auth.validateUser();
	form.data = {
		firstName: user.firstName,
		lastName: user.lastName,
		displayName: user.displayName
	};
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, profileSchema);
		//console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		//add user to db
		try {
			console.log('updating profile');
			const { user } = await event.locals.auth.validateUser();

			auth.updateUserAttributes(user.userId, {
				firstName: form.data.firstName,
				lastName: form.data.lastName,
				displayName: form.data.displayName
			});
			//await auth.invalidateAllUserSessions(user.userId);
		} catch (e) {
			console.error(e);
			return setError(form, null, 'There was a problem updating your profile.');
		}
		console.log('profile updated successfully');
		return message(form, 'Profile updated successfully.');
	}
};
