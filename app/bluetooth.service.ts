import { Injectable } from '@angular/core';
import { LoadingIndicator } from "nativescript-loading-indicator";
import { DialogService } from './dialog.service';

@Injectable()
export class BluetoothService {

    private bluetooth;
    private blthDevices: any[] = [];
    private loader = new LoadingIndicator();

    constructor(private dialogService : DialogService) {
        this.bluetooth = require("nativescript-bluetooth");
    }

    public startAndScan(loadingMode: boolean) {
        loadingMode ? this.loader.show({
            message: 'Enabling and scanning...'
        }) : null;
        // abilitazione android
        return this.bluetooth.enable().then(function (enabled) {
            if (enabled) {
                // azzero array
                this.blthDevices = [];
                // parte la scansione (sempre promise)
                return this.bluetooth.startScanning({
                    seconds: 10,
                    onDiscovered: (host: any) => {
                        alert(host.UUID);
                        // aggiunta all'array
                        this.blthDevices.push(host);
                    }
                }).then(function () {
                    // schermata di loading solo se è attiva la modalità di loading
                    loadingMode ? this.loader.hide() : null;
                }.bind(this), function (err) {
                    loadingMode ? this.loader.hide() : null;
                    throw new Error("Bluetooth error");
                }.bind(this));
            }
            else {
                loadingMode ? this.loader.hide() : null;
                throw new Error("Bluetooth disabled");
            }
        }.bind(this));

    }

    public isEnabled(): Promise<boolean> {
        return this.bluetooth.isBluetoothEnabled();
    }

    public getDevices() {
        return this.blthDevices;
    }
}
