import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductHomeComponent } from './product-home/product-home.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { productRouting } from '../urls/angular.url';
import { CreateBatchComponent } from './create-batch/create-batch.component';

const routes: Routes = [
  {
    path: productRouting.home,
    component: ProductHomeComponent
  },
  {
    path: productRouting.create,
    component: CreateProductComponent
  },
  {
    path: `${productRouting.createBatch}/:productId`,
    component: CreateBatchComponent
  }
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
