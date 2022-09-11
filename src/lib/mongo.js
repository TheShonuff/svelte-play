import { ATLAS_URI3 } from '$env/static/private';
import { json } from '@sveltejs/kit';
// import dotenv from 'dotenv';
// dotenv.config();

import { MongoClient } from 'mongodb';

const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
};

const client = new MongoClient(ATLAS_URI3);

await client.connect();
// const database = client.db('ToDo');
// const Tasks = await database.collection('Tasks').find({}).toArray();

// export default Tasks;
export default client.db('ToDo');

// export default async function connect() {
// 	try {
// 		await client.connect();
// 		const database = client.db('ToDo');
// 		const Tasks = await database.collection('Tasks');

// 		console.log(`from Mongo.js in /Lib ${{ Tasks }}`);
// 		return json.toString(Tasks);
// 	} finally {
// 		await client.close();
// 	}
// }
