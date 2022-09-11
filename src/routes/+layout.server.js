import db from '$lib/mongo';

//import mongoDB connection and set the query. Parse the query because ObjectID isn't a friend POJO.

const tasks = await db.collection('Tasks').find({}).toArray();

// Solution to get around _id: ObjectID => POJO
const parsedTasks = JSON.parse(JSON.stringify(tasks));
console.log(tasks);

const urlResions = 'https://covid-19-statistics.p.rapidapi.com/regions';
const urlProvinces = 'https://covid-19-statistics.p.rapidapi.com/provinces?iso=USA';
const urlReport =
	'https://covid-19-statistics.p.rapidapi.com/reports?region_province=Arizona&iso=USA&region_name=US&date=2022-09-03';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5239e6de29msh954aed23562ce7ep1d5c15jsnf5ae6e107277',
		'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
	}
};

const respose = await fetch(urlReport, options);
export const json = await respose.json();

// Send Data from mongoDB
console.log(`This message is from / +layout.server.js`);
/** @type {import('./$types').PageServerLoad} */
export function load() {
	return {
		parsedTasks
	};
}
