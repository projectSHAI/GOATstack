import { NgRedux } from 'ng2-redux';
import { TimeOfDayActions } from './time-of-day.actions';

class MockRedux extends NgRedux<any> {
  constructor() {
    super(null);
  }
  dispatch: () => {};
}

const day: Array<number>   = [7,8,9,10,11,12,13,14,15,16,17,18];
const night: Array<number> = [0,1,2,3,4,5,6,19,20,21,22,23,24];

describe('TimeOfDay Actions Creator', () => {
  let actions: TimeOfDayActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    mockRedux = new MockRedux();
    actions = new TimeOfDayActions(mockRedux);
  });

  it('should dispatch NIGHT_TIME action', () => {
    const expectedAction = {
      type: TimeOfDayActions.NIGHT_TIME
    };

    spyOn(mockRedux, 'dispatch');
    for(let i: number = 0; i < night.length; i++){

      actions.timeOfDay(night[i]);

      expect(mockRedux.dispatch).toHaveBeenCalled();
      expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    
    }


  });

  it('should dispatch DAY_TIME action', () => {
    const expectedAction = {
      type: TimeOfDayActions.DAY_TIME
    };

    spyOn(mockRedux, 'dispatch');
    for(let i: number = 0; i < day.length; i++){

      actions.timeOfDay(day[i]);

      expect(mockRedux.dispatch).toHaveBeenCalled();
      expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
    
    }

  });
});