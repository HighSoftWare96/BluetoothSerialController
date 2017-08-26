import { Component } from "@angular/core";
import { BluetoothService } from "../bluetooth.service"
import { Router } from "@angular/router";

@Component({
    selector: "home",
    templateUrl: `home/home.component.html`,
    styleUrls: ['home/home.component.css']
})
export class HomeComponent {
    constructor(private blthService: BluetoothService, private router: Router) {

    }

    private imageOn = "~/images/home_on.png";
    private imageOff = "~/images/home_off.png";
    public imageBlth = this.imageOff;


    public enableBlth() {

        this.imageBlth = this.imageOn;
        // promises
        this.blthService.startAndScan().then(function () {
            this.router.navigate(["/list"]);
        }.bind(this)).catch(function (err) {
            alert(err.message);
            this.imageBlth = this.imageOff;
        }.bind(this));



    }

}