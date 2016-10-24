/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { HomeComponent } from './home.component';
import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

class MockWonderService {}
class MockSocketSerivce {}

describe('HomeComponent Test', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: WonderService, useClass: MockWonderService },
        { provide: SocketService, useClass: MockSocketSerivce }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;

    done();
  });

  it('should instantiate component', () => {
    expect(comp instanceof HomeComponent).toBe(true, 'should create HomeComponent');
  });
});
