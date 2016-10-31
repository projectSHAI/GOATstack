import { reimmutifyUserForm } from './userForm.transformers';

export const INITIAL_STATE = reimmutifyUserForm({
  userSigning: false,
  userSignup: false
});
