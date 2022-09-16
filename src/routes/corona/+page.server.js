import db from '$lib/mongo';
import { savedTasks } from '$lib/store';
import { RAPID_KEY, RAPID_KEY2 } from '$env/static/private';

export const csr = true;

const urlReport =
	'https://covid-19-statistics.p.rapidapi.com/reports?region_province=Arizona&iso=USA&region_name=US&date=2022-09-03';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': RAPID_KEY2,
		'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
	}
};

const urlVaccine =
	'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/northamerica';

const vaccineOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': RAPID_KEY2,
		'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
	}
};

// ****

/** @type {import('./$types').PageServerLoad;} */
export async function load({ props }) {
	const response = await fetch(urlReport, options);

	const vaccineResponse = await fetch(urlVaccine, vaccineOptions);
	let newTasks = await db.collection('Tasks').find({}).toArray();
	let parsedNewTasks = JSON.parse(JSON.stringify(newTasks));
	const result = await response.json();
	const vac = await vaccineResponse.json();
	const myNum = 24;
	const user = false;
	console.log('load function in +page.server.js');
	return { result, myNum, vac, user, parsedNewTasks };
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
	},

	//removes entry based on matching name. Does not refresh webpage
	delete: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('id');
		const index = data.get('index');
		console.log(`Delete see ${name}`);
		db.collection('Tasks').deleteOne({ name: name });
	},
	add: async ({ request }) => {
		const data = await request.formData();
		const todo = data.get('todo');

		console.log(`You need to do ${todo}`);
		db.collection('Tasks').insertOne({ name: todo, status: 'not done' });
	}
};
