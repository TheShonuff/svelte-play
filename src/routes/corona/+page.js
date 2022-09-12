// Takes data from +page.server.js
const urlReport =
	'https://covid-19-statistics.p.rapidapi.com/reports?region_province=Arizona&iso=USA&region_name=US&date=2022-09-03';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5239e6de29msh954aed23562ce7ep1d5c15jsnf5ae6e107277',
		'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
	}
};

const urlVaccine =
	'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/northamerica';

const vaccineOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5239e6de29msh954aed23562ce7ep1d5c15jsnf5ae6e107277',
		'X-RapidAPI-Host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com'
	}
};

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const response = await fetch(urlReport, options);

	const vaccineResponse = await fetch(urlVaccine, vaccineOptions);

	const result = await response.json();
	const vac = await vaccineResponse.json();
	const myNum = 24;
	const user = false;

	//load mongoDB result from layout.server.js
	const { parsedTasks } = await parent();

	return {
		result,
		myNum,
		vac,
		user,
		parsedTasks
	};
}

// export function load({ data }) {
// 	return {
// 		b: data.a * 4
// 	};
// }

// Passes data to +page.svelte
