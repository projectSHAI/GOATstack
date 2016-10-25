/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { SkyComponent } from './sky.component';
import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

class MockWonderService {}
class MockSocketSerivce {}

describe('SkyComponent Test', () => {
  let comp: SkyComponent;
  let fixture: ComponentFixture<SkyComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: WonderService, useClass: MockWonderService },
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
