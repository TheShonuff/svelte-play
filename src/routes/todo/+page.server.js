import db from '$lib/mongo';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	let tasks = await db.collection('Tasks').find({}).toArray();
	let parsedTasks = JSON.parse(JSON.stringify(tasks));
	return {
		parsedTasks
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	done: () => {
		console.log('done');
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('id');
		const index = data.get('index');
		console.log(`Deleted ${name}`);
		db.collection('Tasks').deleteOne({ name: name });
	},
	add: async ({ request }) => {
		const data = await request.formData();
		const todo = data.get('todo');

		console.log(`You need to do ${todo}`);
		db.collection('Tasks').insertOne({ name: todo, status: 'not done' });
	}
};
