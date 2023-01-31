import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BillingHomeComponent } from './billing-home/billing-home.component';
import { BillingRoutingModule } from './billing-routing.module';



@NgModule({
  declarations: [
    BillingHomeComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    SharedModule
  ]
})
export class BillingModule { }
