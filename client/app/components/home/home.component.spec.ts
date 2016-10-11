/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { HomeComponent } from './home.component';
import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

class MockWonderService {}
class MockSocketSerivce {}

describe('HomeComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: WonderService, useClass: MockWonderService },
        { provide: SocketService, useClass: MockSocketSerivce }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);

    done();
  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof HomeComponent).toBe(true, 'should create HomeComponent');
  });
});
