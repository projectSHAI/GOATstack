import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeaderComponent } from '../header/header.component';

import { HomeComponent } from '../home/home.component';

import { FooterComponent } from '../footer/footer.component';

import { Four0FourComponent } from '../404/four0four.component';

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.html',
  directives: [HeaderComponent, FooterComponent, HomeComponent, Four0FourComponent, ROUTER_DIRECTIVES]
})

export class AppComponent { }