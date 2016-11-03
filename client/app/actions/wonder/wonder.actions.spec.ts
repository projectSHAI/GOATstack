import { Observable } from 'rxjs/Observable';

import { NgRedux } from 'ng2-redux';
import { ErrorHandlerActions } from '../error/errorHandler.actions';
import { WonderActions } from './wonder.actions';
import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

const wonderList = [{
  _id: '1',
  created: '1',
  name: 'SocketIO',
  xcoor: 20,
  ycoor: 25
}, {
    _id: '2',
    created: '2',
    name: 'MongoDB',
    xcoor: 20,
    ycoor: 35
  }, {
    _id: '3',
    created: '3',
    name: 'Angular 2',
    xcoor: 25,
    ycoor: 45
  }, {
    _id: '4',
    created: '4',
    name: 'Karma',
    xcoor: 40,
    ycoor: 18
  }, {
    _id: '5',
    created: '5',
    name: 'Express',
    xcoor: 60,
    ycoor: 65
  }, {
    _id: '6',
    created: '6',
    name: 'Jasmine',
    xcoor: 80,
    ycoor: 55
  }, {
    _id: '7',
    created: '7',
    name: 'OAuth',
    xcoor: 15,
    ycoor: 35
  }, {
    _id: '8',
    created: '8',
    name: 'Node',
    xcoor: 13,
    ycoor: 40
  }, {
    _id: '9',
    created: '9',
    name: 'Redux',
    xcoor: 15,
    ycoor: 35
  }, {
    _id: '10',
    created: '10',
    name: 'Protractor',
    xcoor: 50,
    ycoor: 15
  }];

  class MockRedux extends NgRedux<any> {
    constructor() {
      super(null);
    }
    dispatch: () => {};
  }

class MockWonderService extends WonderService {
  constructor() {
    super(null);
  }
  getWonders(): Observable<any> {
    return Observable.of(wonderList);
  }
  saveWonders(name: string): Observable<any> {
    return Observable.of({
      _id: '10',
      created: '10',
      name: 'TEST',
      xcoor: 50,
      ycoor: 15
    });
  }
}

describe('Wonder Actions Creator', () => {
  let actions: WonderActions;
  let wonderService: WonderService;
  let socket: SocketService;
  let errorActions: ErrorHandlerActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    wonderService = new MockWonderService();
    mockRedux = new MockRedux();
    errorActions = new ErrorHandlerActions(mockRedux);
    actions = new WonderActions(mockRedux, errorActions, wonderService);
  });

  it('should dispatch INITIALIZE_WONDERS action', () => {
    const expectedAction = {
      type: WonderActions.INITIALIZE_WONDERS,
      payload: wonderList
    };

    spyOn(mockRedux, 'dispatch');
    actions.initWonders(wonderList);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch CHANGE_WONDERS action', () => {
    const wonder = {
      _id: '9',
      created: '9',
      name: 'NEW WONDER',
      xcoor: 15,
      ycoor: 35
    };

    const expectedAction = {
      type: WonderActions.CHANGE_WONDERS,
      payload: { index: 7, object: wonder }
    };

    spyOn(mockRedux, 'dispatch');
    actions.changeWonder(wonder, 7);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
