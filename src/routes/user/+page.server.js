import db from '$lib/mongo';
import { loggedIN } from '$lib/store';

let signIN;

loggedIN.subscribe((value) => {
	signIN = value;
});

let symbol = 1;

if (symbol === 1) {
	loggedIN.update((n) => true);
} else {
	loggedIN.update((n) => false);
}

console.log(signIN);
