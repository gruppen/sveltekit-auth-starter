import type { RequestHandler } from './$types';
import prisma from '$lib/config/prisma';

// Define the documentType enum
enum documentType {
	INVOICE = 'INVOICE',
	CREDITNOTE = 'CREDITNOTE',
	DEBITNOTE = 'DEBITNOTE'
}

// function to generate a sample document
const generateSampleDocument = async () => {
	await prisma.document.create({
		data: {
			id: String.fromCharCode(Math.floor(Math.random() * 1000)),
			name: `Test Document ${Math.floor(Math.random() * 1000)}`,
			user_id: 'zj7pCdsua8aXfCU',
			docType: 'INVOICE'
		} as any
	});
};

// function to generate n-many sample documents (default 10) by using createMany and passing in an array of objects

const generateSampleDocuments = async (num: number = 10) => {
	const documents = Array.from(Array(num).keys()).map(() => {
		return {
			id: crypto.randomUUID(),
			name: `Test Document ${Math.floor(Math.random() * 1000)}`,
			user_id: 'zj7pCdsua8aXfCU',
			docType: 'INVOICE'
		};
	});
	await prisma.document.createMany({
		data: documents as any
	});
};

export const GET: RequestHandler = async ({ url }) => {
	const numToGenerate = Number(url.searchParams.get('numToGenerate') ?? '10');

	await generateSampleDocuments(10);
	return new Response(JSON.stringify({ message: 'Documents generated' }), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
