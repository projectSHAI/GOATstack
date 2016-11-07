import { reimmutifyUserForm } from './userForm.transformers';

// Define the initial state of userForm object
export const INITIAL_STATE = reimmutifyUserForm({
  userSigning: false,
  userSignup: false
});
