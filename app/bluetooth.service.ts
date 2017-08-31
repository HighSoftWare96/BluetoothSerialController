import { Injectable } from '@angular/core';
import { LoadingIndicator } from "nativescript-loading-indicator";
import { DialogService } from './dialog.service';
import * as bluetooth from 'nativescript-bluetooth';
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Peripheral } from 'nativescript-bluetooth';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class BluetoothService {

    private blthDevices: ObservableArray<Peripheral> = new ObservableArray<Peripheral>();
    private loader = new LoadingIndicator();
    // TODO variabile isenabled
    public isBluetoothEnabled: boolean;

    constructor(private dialogService: DialogService) {
        // TODO linking dell'observable alla variabile? Dove va fatto??
        this.listenToBluetoothEnabled().subscribe(enabled => this.isBluetoothEnabled = enabled);
    }

    public startAndScan(loadingMode: boolean) {
        loadingMode ? this.loader.show({
            message: 'Scanning, please wait...'
        }) : null;
        // abilitazione android
        return bluetooth.enable().then(function (enabled) {
            if (enabled) {
                // azzero array
                this.blthDevices = new ObservableArray<Peripheral>();
                // parte la scansione (sempre promise)
                return bluetooth.startScanning({
                    serviceUUIDs: [],
                    seconds: 4,
                    onDiscovered: (host: Peripheral) => {
                        loadingMode ? alert(host.UUID) : null;
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

    public connect(uuid: string) {
        this.loader.show({
            message: 'Connecting, please wait...'
        });
        bluetooth.connect({
            UUID: uuid,
            onConnected: function (peripheral) {
                this.loader.hide();
                alert("Periperhal connected with UUID: " + peripheral.UUID);

                // the peripheral object now has a list of available services:
                peripheral.services.forEach(function (service) {
                    alert("service found: " + JSON.stringify(service));
                });
            },
            onDisconnected: function (peripheral) {
                alert("Periperhal disconnected with UUID: " + peripheral.UUID);
            }
        });
    }

    private listenToBluetoothEnabled(): Observable<boolean> {   
        // TODO da testare
        return new Observable(observer => {
            bluetooth.isBluetoothEnabled().then(enabled => observer.next(enabled))
            let intervalHandle = setInterval(
                () => {
                    bluetooth.isBluetoothEnabled().then(enabled => observer.next(enabled))
                }
            , 1000);
            // stop checking every second on unsubscribe
            return () => clearInterval(intervalHandle);
        }).distinctUntilChanged();
    }
    
    // TODO funzione...
    public isEnabled(): boolean {
        this.listenToBluetoothEnabled().subscribe(enabled => return enabled);
    }

    public getDevices(): ObservableArray<Peripheral> {
        return this.blthDevices;
    }
}
