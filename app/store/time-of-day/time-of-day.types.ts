import { Map } from 'immutable';

// Interface describing the attributes
// the corresponding reducer will need
// to manipulate (immutably)
export interface ITimeOfDayItems {
  cloudBrightness: string;
  skySvg: string;
  mountainGoatSvg: string;
  islandSvg: string;
  oceanFrontSvg: string;
  whaleSvg: string;
  sunMoonGlow: string;
  sunMoonBorder: string;
};

// Export the type so the reducer and store will understand
export type ITimeOfDay = Map<ITimeOfDayItems, ITimeOfDayItems>;
