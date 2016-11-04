import { reimmutifyError } from './errorHandler.transformers';

export const INITIAL_STATE = reimmutifyError({
  message: '',
});
