/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { CelestialBodiesComponent } from './celestial-bodies.component';
import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

class MockWonderService {}
class MockSocketSerivce {}

describe('CelestialBodiesComponent Test', () => {
  let comp: CelestialBodiesComponent;
  let fixture: ComponentFixture<CelestialBodiesComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: WonderService, useClass: MockWonderService },
        { provide: SocketService, useClass: MockSocketSerivce }
      ]
    });

    fixture = TestBed.createComponent(CelestialBodiesComponent);
    comp = fixture.componentInstance;

    done();
  });

  it('should instantiate component', () => {
    expect(comp instanceof CelestialBodiesComponent).toBe(true, 'should create CelestialBodiesComponent');
  });
});
