import { Map } from 'immutable';

// Interface describing the attributes
// the corresponding reducer will need
// to manipulate (immutably)
export interface ITimeOfDayItems {
  cloudBrightness: string;
  skySvg: string;

  goatSvg: string;
  mountainSvg: string;
  islandSvg: string;
  treeSvg: string;

  oceanSvg: string;
  whaleSvg: string;
};

// Export the type so the reducer and store will understand
export type ITimeOfDay = Map<ITimeOfDayItems, ITimeOfDayItems>;
