/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { SkyComponent } from './sky.component';
import { SocketService } from '../../services/socketio/socketio.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

class MockSocketSerivce {
  syncUpdates(model: string, array: any, cb) { }
  unsyncUpdates(model: string) { }
}

describe('SkyComponent Test', () => {
  let comp: SkyComponent;
  let fixture: ComponentFixture<SkyComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: SocketService, useClass: MockSocketSerivce }
      ]
    });

    fixture = TestBed.createComponent(SkyComponent);
    comp = fixture.componentInstance;

    done();
  });

  it('should instantiate component', () => {
    expect(comp instanceof SkyComponent).toBe(true, 'should create SkyComponent');
  });
});
