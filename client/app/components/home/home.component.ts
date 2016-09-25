import { Component, OnInit } from '@angular/core';

import { WonderService } from '../../services/wonder.service';

export class Wonder {
    _id: number;
    name: string;
    xcoor: number;
    ycoor: number;
}

@Component({
    selector: 'home-section',
    providers: [WonderService],
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
            .then(wonders => this.wonders = wonders)
            .then(() => {
              console.log(this.wonders);
            })
            .catch(error => this.errorMessage = <any>error);
    }

    testWonders() {
        console.log(this.wonders);
    }
}
