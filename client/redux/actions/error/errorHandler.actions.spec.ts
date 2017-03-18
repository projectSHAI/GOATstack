import { NgRedux } from '@angular-redux/store';
import { ErrorHandlerActions } from './errorHandler.actions';

class MockRedux extends NgRedux<any> {
  constructor() {
    super(null);
  }
  dispatch: () => {};
}

describe('ErrorHandler Actions Creator', () => {
  let actions: ErrorHandlerActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    mockRedux = new MockRedux();
    actions = new ErrorHandlerActions(mockRedux);
  });

  it('should dispatch SHOW_ERROR action', () => {
    const expectedAction = {
      type: ErrorHandlerActions.SHOW_ERROR,
      payload: 'Testing Error Message'
    };

    spyOn(mockRedux, 'dispatch');
    actions.showError('Testing Error Message');

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch HIDE_ERROR action', () => {
    const expectedAction = {
      type: ErrorHandlerActions.HIDE_ERROR
    };

    spyOn(mockRedux, 'dispatch');
    actions.hideError();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
