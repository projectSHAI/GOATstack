import 'core-js';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/proxy';

import 'rxjs';

import 'reflect-metadata';
import { Component } from  "@angular/core";
import { TestBed } from  "@angular/core/testing";
import { HeaderComponent } from './header.component';
import { UserService } from '../../services/user.service';

import { expect } from 'chai';

describe('HeaderComponent test', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [],
      providers: [UserService]
    });
  });

//   it('should do something', async(() => {
//   // Overrides here, if you need them
//   TestBed.overrideComponent(HeaderComponent, {
//     set: {
//       template: '<div>Overridden template here</div>'
//       // ...
//     }
//   });
//
//   TestBed.compileComponents().then(() => {
//     const fixture = TestBed.createComponent(HeaderComponent);
//     // Access the dependency injected component instance
//     const app = fixture.componentInstance;
//
//     expect(app.testUser).toBe('something');
//
//     // Access the element
//     const element = fixture.nativeElement;
//
//     // Detect changes as necessary
//     fixture.detectChanges();
//
//     expect(element.textContent).toContain('something');
//   });
// }));

  it('User Login test', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    // Access the dependency injected component instance
    const app = fixture.componentInstance;

    expect(app.testUser).to.be.equal('test');
  });

});
