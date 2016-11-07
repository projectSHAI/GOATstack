import { reimmutifyError } from './errorHandler.transformers';

// Define the INITIAL_STATE of the error attribute in the store
export const INITIAL_STATE = reimmutifyError({
  message: '',
});
