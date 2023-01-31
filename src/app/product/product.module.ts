import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from './product-home/product-home.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './services/product.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProductHomeComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
