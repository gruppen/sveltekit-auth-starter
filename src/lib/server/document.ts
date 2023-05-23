import prisma from '$lib/config/prisma';

// Define the documentType enum
enum documentType {
	INVOICE = 'INVOICE',
	CREDITNOTE = 'CREDITNOTE',
	DEBITNOTE = 'DEBITNOTE'
}

// function to generate a sample document
const generateSampleDocument = async (num: number) => {
	await prisma.document.create({
		data: {
			name: `Test Document ${Math.floor(Math.random() * 1000)}`,
			user_id: 'zj7pCdsua8aXfCU',
			docType: documentType.INVOICE
		} as any
	});
};

// function to generate n-many sample documents (default 10) by using createMany and passing in an array of objects
const generateSampleDocuments = async (num: number = 10) => {
	const documents = Array.from(Array(num).keys()).map((i) => {
		return {
			name: `Test Document ${Math.floor(Math.random() * 1000)}`,
			user_id: 'zj7pCdsua8aXfCU',
			docType: documentType.INVOICE
		};
	});
	await prisma.document.createMany({
		data: documents as any
	});
};
