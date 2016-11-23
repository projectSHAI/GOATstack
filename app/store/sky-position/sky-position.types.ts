import { Map } from 'immutable';

// Interface describing the attributes
// the corresponding reducer will need
// to manipulate (immutably)
export interface ISkyPositionItems {
  toSkyIsland: boolean;
};

// Export the type so the reducer and store will understand
export type ISkyPosition = Map<ISkyPositionItems, ISkyPositionItems>;