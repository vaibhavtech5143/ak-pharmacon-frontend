import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../product/services/product.service';

@Component({
  selector: 'app-billing-home',
  templateUrl: './billing-home.component.html',
  styleUrls: ['./billing-home.component.scss']
})
export class BillingHomeComponent {

  productData:any;
  constructor(
    private readonly productService: ProductService
  ){}

  createBillForm = new FormGroup({
    name : new FormControl('Ramndom', Validators.required),
    company : new FormControl('', 
      [Validators.required]
    ),
    productCategory : new FormControl(''),
    productType : new FormControl('',Validators.required),
    hsnCode : new FormControl('', Validators.required),
  });

  get name() {
    return this.createBillForm.get('name');
  }
  get company() {
    return this.createBillForm.get('company');
  }
  get productCategory() {
    return this.createBillForm.get('productCategory');
  }
  get productType() {
    return this.createBillForm.get('comment');
  }
  get hsnCode() {
    return this.createBillForm.get('hsnCode');
  }


  createBill(){
    console.log('callig create product api');
    if(this.createBillForm.invalid){
      console.log('form is invalid');
      this.createBillForm.markAllAsTouched();
      return;
    }
    
    // this.productService.createProduct(this.createBillForm.value).subscribe((data)=>{
    //   console.log('CreatedProduct: ',data);
    //   this.createBillForm.reset();
    // },(error)=>{
    //   console.error('Error occured',error);
    // })
  }

  ngOnInit(){
    this.productService.getAllProducts().subscribe(
      data=>{

      }
    )
  }
}
