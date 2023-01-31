import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productApiUrl } from '../../urls/api.url';
@Injectable()
export class ProductService {
  productApiUrl = productApiUrl
  constructor(
    private http:HttpClient
  ) { }

  createProduct(productData: any){
    return this.http.post(this.productApiUrl.createProduct, productData);
  }

  getAllProducts(){
    return this.http.get(this.productApiUrl.getAllProducts);
  }
}
