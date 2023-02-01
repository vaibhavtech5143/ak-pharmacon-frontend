import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.scss']
})
export class CreateinvoiceComponent {
  constructor() {
  }
  pagetitle = "Create Invoice";

 


  get productFormGroup(){
    return new FormGroup({
      productCode: new FormControl('s',[Validators.required]),
      productName: new FormControl('s',[Validators.required]),
      qty: new FormControl('s',[Validators.required]),
      salesPrice: new FormControl('s',[Validators.required]),
      total: new FormControl('item.title', [Validators.required]),
      completed: new FormControl('item.completed', [Validators.required]),
      priority: new FormControl('item.priority', [Validators.required]),
    })
  }

  invoiceForm = new FormGroup({
    invoiceNo: new FormControl('', Validators.required),
    company: new FormControl('',
      [Validators.required]
    ),
    productCategory: new FormControl(''),
    productType: new FormControl('', Validators.required),
    hsnCode: new FormControl('', Validators.required),
    customerId: new FormControl('', Validators.required),
    deliveryAddress: new FormControl('', Validators.required),
    remarks: new FormControl('', Validators.required),
    details: new FormArray([this.productFormGroup]),
   
    tax: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
    netTotal: new FormControl('', Validators.required)

  });

  invoiceNo = this.invoiceForm.get('invoiceNo');
  get getDetails(){
    return <FormArray>this.invoiceForm.get('details')
  }  


  addProduct(){
    this.getDetails.push(this.productFormGroup)
  };

  deleteProduct(index: number){
    this.getDetails.removeAt(index);
  }

  createBill(){

  }

}
