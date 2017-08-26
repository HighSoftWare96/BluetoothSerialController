import { Component } from "@angular/core";
import { BluetoothService } from "../bluetooth.service"


@Component({
    selector: "list",
    templateUrl: `devicelist/devicelist.component.html`,
    styleUrls: ['devicelist/devicelist.component.css']
})
export class DeviceListComponent {
    constructor(private blthService: BluetoothService) {
    }

}