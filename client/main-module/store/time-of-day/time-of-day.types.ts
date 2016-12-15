import { Map } from 'immutable';

// Interface describing the attributes
// the corresponding reducer will need
// to manipulate (immutably)
export interface ITimeOfDayItems {
  titleColor:      string;
  nightTime:       boolean;
  cloudBrightness: string;
  skyColor:        string;
  mountainGoatSvg: string;
  islandSvg:       string;
  oceanFrontSvg:   string;
  whaleSvg:        string;
  sunMoonGlow:     string;
  sunMoonBorder:   string;
};

// Export the type so the reducer and store will understand
export type ITimeOfDay = Map<ITimeOfDayItems, ITimeOfDayItems>;
