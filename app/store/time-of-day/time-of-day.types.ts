import { Map } from 'immutable';

// Interface describing the attributes
// the corresponding reducer will need
// to manipulate (immutably)
export interface ITimeOfDayItems {
  styles: any
};

// Export the type so the reducer and store will understand
export type ITimeOfDay = Map<ITimeOfDayItems, ITimeOfDayItems>;
