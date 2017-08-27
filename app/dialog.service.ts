import { Injectable } from '@angular/core';
import * as dialogs from "ui/dialogs";

@Injectable()
export class DialogService {
    // punto di domanda agli argomenti facoltativi
    public alert(message: string, title?: string, okText?: string) {
        dialogs.alert({
            title: title === undefined ? "Alert" : title,
            message: message,
            okButtonText: okText === undefined ? "Ok" : okText
        }).then(() => {
            console.log("Dialog closed!");
        });
    }
}