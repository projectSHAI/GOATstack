import { reimmutifyUser } from './user.transformers';
import { Map } from 'immutable';

// Define the INITIAL_STATE of the user object
export const INITIAL_STATE = reimmutifyUser({
	fetching: false
});
