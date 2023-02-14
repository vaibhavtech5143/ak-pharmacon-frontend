import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BillingHomeComponent } from './billing-home/billing-home.component';
import { CreateBillComponent } from './create-bill/create-bill.component';

const routes: Routes = [
  {
    path: '',
    component: BillingHomeComponent
  },
  {
    component: CreateBillComponent, path: "createinvoice",
  },
  // {
  //   component: CreateBillComponent, path: "editinvoice/:invoiceno",

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
