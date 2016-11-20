import { NgRedux } from 'ng2-redux';
import { ZoomActions } from './zoom.actions';

const testPayload = {
        portraitTl: 'this is a portraitTl',
        landscapeTl: 'this is a landscapeTl'
      };

class MockRedux extends NgRedux<any> {
  constructor() {
    super(null);
  }
  dispatch: () => {};
}

describe('Zoom Actions Creator', () => {
  let actions: ZoomActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    mockRedux = new MockRedux();
    actions = new ZoomActions(mockRedux);
  });

  it('should dispatch UPDATE_TIMELINES action', () => {
    const expectedAction = {
      type: ZoomActions.UPDATE_TIMELINES,
      payload: testPayload
    };

    spyOn(mockRedux, 'dispatch');
    actions.updateTimelines(testPayload);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch UPDATE_SHOW_HIDE action', () => {
    const expectedAction = {
      type: ZoomActions.UPDATE_SHOW_HIDE
    };

    spyOn(mockRedux, 'dispatch');
    actions.updateShowHide();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
