import { Component } from "@angular/core";
import { BluetoothService } from "../bluetooth.service"
import { Router } from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { DialogService } from '../dialog.service';

@Component({
    selector: "home",
    templateUrl: `home/home.component.html`,
    styleUrls: ['home/home.component.css']
})
export class HomeComponent {
    constructor(private blthService: BluetoothService, private router: Router, private dialogService : DialogService) {

    }

    public imageOn = "~/images/home_on.png";
    public imageOff = "~/images/home_off.png";
    public imageBlth = this.imageOff;


    public enableBlth() {

        this.imageBlth = this.imageOn;
        // promises
        this.blthService.startAndScan(true).then(function () {
            this.router.navigate(["/list"]);
        }.bind(this)).catch(function (err) {
            this.dialogService.alert(err.message, "Error");
            this.imageBlth = this.imageOff;
        }.bind(this));

    }

}