import { HomeComponent } from "./home/home.component";
import { AppComponent } from "./app.component";
import { DeviceListComponent } from "./devicelist/devicelist.component"

export const routes = [
  { path: "", component: HomeComponent },
  { path: "list", component: DeviceListComponent }
];

export const navigatableComponents = [
  AppComponent,
  HomeComponent,
  DeviceListComponent
];