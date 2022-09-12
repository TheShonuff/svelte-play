import { writable } from 'svelte/store';

/** @param {Array.<Object>} savedTasks */
export const savedTasks = writable();
