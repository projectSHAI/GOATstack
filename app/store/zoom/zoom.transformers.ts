import { Map } from 'immutable';
import { IZoom, IZoomItems } from './zoom.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifyZoom(state: IZoom): Object {
  return state.toJS();
}

export function reimmutifyZoom(plain): IZoom {
  return Map<IZoomItems, IZoomItems>(plain ? plain : {});
}
