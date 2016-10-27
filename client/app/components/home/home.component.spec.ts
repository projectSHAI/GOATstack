/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { HomeComponent } from './home.component';
import { SocketService } from '../../services/socketio/socketio.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

class MockSocketSerivce {
  syncUpdates(model: string, array: any, cb) { }
  unsyncUpdates(model: string) { }
}

describe('HomeComponent Test', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
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
