import prisma from '$lib/config/prisma';

export const load = async ({ params }) => {
	const { id } = params;
	const document = await prisma.document.findUnique({
		where: {
			id
		}
	});
	return {
		document
	};
};
