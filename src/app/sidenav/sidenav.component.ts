import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav-controler',
  templateUrl: './sidenav.component.html',
  styleUrls: [ './sidenav.component.css' ]
})
export class SidenavComponent implements OnInit {

    @ViewChild('sidenav') sidenav: MatSidenav;
    reason = '';
          
    constructor() { }

    ngOnInit() {
    }

    close(reason: string) {
        this.reason = reason;
        this.sidenav.close();
    }

}
