import { NgRedux } from 'ng2-redux';
import { SkyPositionActions } from './sky-position.actions';

class MockRedux extends NgRedux<any> {
  constructor() {
    super(null);
  }
  dispatch: () => {};
}

describe('Sky Position Actions Creator', () => {
  let actions: SkyPositionActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    mockRedux = new MockRedux();
    actions = new SkyPositionActions(mockRedux);
  });

  it('should dispatch UPDATE_SHOW_HIDE action', () => {
    const expectedAction = {
      type: SkyPositionActions.UPDATE_SKY_POSITION
    };

    spyOn(mockRedux, 'dispatch');
    actions.updateSkyPosition();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
