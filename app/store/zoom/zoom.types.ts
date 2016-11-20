import { Map } from 'immutable';

// Interface describing the attributes
// the corresponding reducer will need
// to manipulate (immutably)
export interface IZoomItems {
  showHide: boolean;
  portraitTl: any;
  landscapeTl: any;
};

// Export the type so the reducer and store will understand
export type IZoom = Map<IZoomItems, IZoomItems>;