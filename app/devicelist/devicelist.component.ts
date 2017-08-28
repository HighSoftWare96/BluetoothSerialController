import { Component, OnInit } from "@angular/core";
import { BluetoothService } from "../bluetooth.service"
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

@Component({
    selector: "list",
    templateUrl: `devicelist/devicelist.component.html`,
    styleUrls: ['devicelist/devicelist.component.css']
})
export class DeviceListComponent {
    constructor(private blthService: BluetoothService) {
    }

    ngOnInit() {

    }

    public refreshList(args) {
        var pullRefresh = args.object;
        this.blthService.startAndScan(false).catch(function (err) {
            alert(err);
        });
        setTimeout(function () {
            pullRefresh.refreshing = false;
        }, 10000);
    }

}