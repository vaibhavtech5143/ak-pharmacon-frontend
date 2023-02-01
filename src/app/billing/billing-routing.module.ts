import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BillingHomeComponent } from './billing-home/billing-home.component';
import { CreateinvoiceComponent } from '../billing/createinvoice/createinvoice.component';

const routes: Routes = [
  {
    path: '',
    component: BillingHomeComponent
  },
  {
    component: CreateinvoiceComponent, path: "createinvoice",
  },
  // {
  //   component: CreateinvoiceComponent, path: "editinvoice/:invoiceno",

  // },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
