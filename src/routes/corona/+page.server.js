import db from '$lib/mongo';

// const tasks = await db.collection('Tasks').find({}).toArray();
// console.log(tasks);

/** @type {import('./types').PageServerLoad;} */
export function load({ props }) {
	const props2 = { b: 2 };
	console.log('load function in +page.server.js');
	return { props2 };
}

/** @type {import('./$types').Actions} */
export const actions = {
	press: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name');
		console.log(`${name} was successfully passed`);
		return {
			Press_success: true,
			name
		};
	},

	speak: () => {
		console.log('spoke');
		const a = 665;
		return {
			a,
			Push_success: true
		};
	},
	done: () => {
		db.collection('Tasks').updateOne({ name: 'dishes' }, { $set: { status: 'done' } });
	}
};
