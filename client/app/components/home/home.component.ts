import { Component, OnInit, OnDestroy } from '@angular/core';

import { WonderService } from '../../services/wonder.service';
import { SocketService } from '../../services/socketio.service';

@Component({
    selector: 'home-section',
    providers: [WonderService, SocketService],
    moduleId: module.id,
    templateUrl: 'home.html',
    styleUrls: ['home.css']
})

export class HomeComponent implements OnInit {
    errorMessage: string;
    wonders = [];
    connection;
    wonder;
    private socket;
    dream = 'Wonders';

    constructor(private wonderService: WonderService) {
        this.socket = new SocketService();
    }

    ngOnInit() {
        this.wonderService.getWonders()
            .subscribe(wonders => {
              this.wonders = wonders;
              this.socket.syncUpdates('wonder', this.wonders, (res) => {
                  // console.log(res);
              });
            });
    }

    ngOnDestroy() {
        this.socket.unsyncUpdates('wonder');
    }

    getWonders() {
        console.log(this.wonders);
    }

    saveWonder(name: string) {
        this.wonderService.saveWonder(name)
            .subscribe(() => {
                // console.log('saveWonder returns');
            });
    }

}
