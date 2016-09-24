import { Component, OnInit } from '@angular/core';
import { WonderService } from '../../services/wonder.service';

export class Wonder {
  id: number;
  name: string;
}

@Component({
    selector: 'home-section',
    providers: [ WonderService ],
    moduleId: module.id,
    templateUrl: 'home.html',
    styleUrls: ['home.css']
})

export class HomeComponent implements OnInit {
    errorMessage: string;
    wonders: Wonder[];

    constructor(private wonderService: WonderService) { }

    ngOnInit() {
        this.getWonders();
    }

    getWonders() {
        this.wonderService.getWonders()
            .subscribe(
            wonders => this.wonders = wonders,
            error => this.errorMessage = <any>error
            );
    }

    testWonders() {
        console.log(this.wonders);
    }
}
