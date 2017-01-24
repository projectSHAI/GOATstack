import { reimmutifyWonder } from './wonder.transformers';

// Define the INITIAL_STATE of the wonder List object
export const INITIAL_STATE = reimmutifyWonder({
	fetching: false,
	sending: false,
	wonder: []
});
