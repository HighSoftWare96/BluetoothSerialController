import { Injectable } from '@angular/core';
import { LoadingIndicator } from "nativescript-loading-indicator";

@Injectable()
export class BluetoothService {
    private bluetooth;
    public deviceUUIDs = [];
    private loader = new LoadingIndicator();

    constructor() {
        this.bluetooth = require("nativescript-bluetooth");
    }

    public startAndScan() {
        this.loader.show({
            message: 'Enabling and scanning...'
        });
        // abilitazione android
        return this.bluetooth.enable().then(function (enabled) {
            if (enabled) {
                // parte la scansione (sempre promise)
                return this.bluetooth.startScanning({
                    serviceUUIDs: this.deviceUUIDs,
                    seconds: 4,
                    onDiscovered: function (host) {
                        this.deviceUUIDs.push(host )
                    }.bind(this)
                }).then(function () {
                    this.loader.hide();
                }.bind(this), function (err) {
                    this.loader.hide();
                    throw new Error("Bluetooth error");
                }.bind(this));
            }
            else {
                this.loader.hide();
                throw new Error("Bluetooth disabled");
            }
        }.bind(this));

    }

    public isEnabled(): boolean {
        return this.bluetooth.isBluetoothEnabled().then(function (enabled) {
            return enabled;
        });
    }
}