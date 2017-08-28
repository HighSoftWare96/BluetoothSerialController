import { Injectable } from '@angular/core';
import { LoadingIndicator } from "nativescript-loading-indicator";
import { DialogService } from './dialog.service';
import bluetooth = require('nativescript-bluetooth');
import { Peripheral } from 'nativescript-bluetooth';

@Injectable()
export class BluetoothService {
    
    private blthDevices: Peripheral[] = [];
    private loader = new LoadingIndicator();

    constructor(private dialogService : DialogService) {
    }

    public startAndScan(loadingMode: boolean) {
        loadingMode ? this.loader.show({
            message: 'Enabling and scanning...'
        }) : null;
        // abilitazione android
        return bluetooth.enable().then(function (enabled) {
            if (enabled) {
                // azzero array
                this.blthDevices = [];
                // parte la scansione (sempre promise)
                return bluetooth.startScanning({
                    seconds: 10,
                    onDiscovered: (host: Peripheral) => {
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
        return bluetooth.isBluetoothEnabled();
    }

    public getDevices() {
        return this.blthDevices;
    }
}
