import { Component } from '@angular/core';
import { productUrl, billingUrl } from './urls/angular.url'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  productUrl = productUrl;
  billingUrl = billingUrl;
}
