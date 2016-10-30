import { WonderActions } from '../actions/wonder.actions';
import { Wonder } from '../models/models.namespace';

const INITIAL_STATE: any = {
  beforeWonders: null,
  afterWonders: null
};

export function wonderReducer(state: Wonder[] = INITIAL_STATE, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
