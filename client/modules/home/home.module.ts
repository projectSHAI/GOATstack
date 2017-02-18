import { NgModule }                                  from '@angular/core';
import { SharedModule }                              from '../shared/shared.module';
import { HomeRoutingModule }                         from './home-routing.module';

import { HomeComponent }                             from './home.component';
import { OceanComponent }                            from './components/ocean/ocean.component';
import { AbyssopelagicZoneComponent }                from './components/abyssopelagic-zone/abyssopelagic-zone.component';
import { BathypelagicZoneComponent }                 from './components/bathypelagic-zone/bathypelagic-zone.component';
import { EpipelagicZoneComponent }                   from './components/epipelagic-zone/epipelagic-zone.component';
import { MesopelagicZoneComponent }                  from './components/mesopelagic-zone/mesopelagic-zone.component';
import { OceanFloorComponent }                       from './components/ocean-floor/ocean-floor.component';
import { WhaleComponent }                            from './components/whale/whale.component';
import { IslandComponent }                           from './components/island/island.component';
import { MountainGoatComponent }                     from './components/mountain-goat/mountain-goat.component';
import { SkyComponent }                              from './components/sky/sky.component';
import { CloudGeneratorComponent }                   from './components/cloud-generator/cloud-generator.component';

@NgModule({
  imports:      [ SharedModule, HomeRoutingModule ],
  declarations: [
  	HomeComponent,
  	SkyComponent,
  	CloudGeneratorComponent,
  	WhaleComponent,
  	MountainGoatComponent,
  	IslandComponent,
  	OceanComponent,
  	EpipelagicZoneComponent,
  	BathypelagicZoneComponent,
  	MesopelagicZoneComponent,
  	AbyssopelagicZoneComponent,
  	OceanFloorComponent
  ]
})
export class HomeModule {
  
}