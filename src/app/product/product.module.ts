import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './services/product.service';
import { SharedModule } from '../shared/shared.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateBatchComponent } from './create-batch/create-batch.component';




@NgModule({
  declarations: [
    ProductHomeComponent,
    CreateProductComponent,
    CreateBatchComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
