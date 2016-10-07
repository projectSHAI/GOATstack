/* tslint:disable:no-unused-variable */
import { HomeComponent } from './home.component';
import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('HomeComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [WonderService, SocketService]
    });
  });

  it('should instantiate component', () => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(HomeComponent);
      expect(fixture.componentInstance instanceof HomeComponent).toBe(true, 'should create HomeComponent');

    });
  });
});
