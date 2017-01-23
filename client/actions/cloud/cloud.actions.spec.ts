import { Observable } from 'rxjs/Observable';
import { NgRedux } from 'ng2-redux';
import { CloudActions } from './cloud.actions';

class MockRedux extends NgRedux<any> {
  constructor() {
    super(null);
  }
  dispatch: () => {};
}

describe('Cloud Actions Creator', () => {
  let actions: CloudActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    mockRedux = new MockRedux();
    actions = new CloudActions(mockRedux);
  });

  it('should dispatch CHANGE_STYLES action', () => {
    const expectedAction = {
      type: CloudActions.CHANGE_STYLES,
      payload: { index: 0, asset: 'testAsset' }
    };

    spyOn(mockRedux, 'dispatch');
    actions.changeStyle('testAsset', 0);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch CHANGE_ANIMA action', () => {
    const expectedAction = {
      type: CloudActions.CHANGE_ANIMA,
      payload: { index: 0, timeline: 'testTimeline' }
    };

    spyOn(mockRedux, 'dispatch');
    actions.changeAnima('testTimeline', 0);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
