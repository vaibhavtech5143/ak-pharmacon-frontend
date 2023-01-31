import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductHomeComponent } from './product-home/product-home.component';

const routes: Routes = [
  {
    path: '',
    component: ProductHomeComponent
},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
