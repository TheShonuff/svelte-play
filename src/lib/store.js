import { writable } from 'svelte/store';

/** @param {Array.<Object>} savedTasks */
export const savedTasks = writable();
/**@param {string} reload*/
export const reload = writable();
