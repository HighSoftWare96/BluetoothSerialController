import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";

@Component({
  selector: "my-app",
  templateUrl: `app.component.html`,
})

export class AppComponent {

  constructor(private page: Page) {

  }
  // Your TypeScript logic goes here
  ngOnInit(){
    //this.page.actionBarHidden = true;
  }
}
