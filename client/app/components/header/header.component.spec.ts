/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";
import { appRoutes } from '../../routes';

import { HeaderComponent } from './header.component';

import { ClockService } from '../../services/clock/clock.service';
import { Observable } from 'rxjs/Observable';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

class MockClockService {}

let comp: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;

describe('HeaderComponent Test', () => {
  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: ClockService, useClass: MockClockService }
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    comp = fixture.componentInstance;

    done();
  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof HeaderComponent).toBe(true);
  });
});
