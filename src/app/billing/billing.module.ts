import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BillingHomeComponent } from './billing-home/billing-home.component';
import { BillingRoutingModule } from './billing-routing.module';
import { CreateinvoiceComponent } from './createinvoice/createinvoice.component';



@NgModule({
  declarations: [
    BillingHomeComponent,
    CreateinvoiceComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    SharedModule
  ]
})
export class BillingModule { }
