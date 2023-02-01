import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.scss']
})
export class CreateinvoiceComponent {
  pagetitle = "Create Bill";
  clientList: any;
  productList: any;
  constructor() {
  }





  get productFormGroup() {
    return new FormGroup({
      productId: new FormControl('s', [Validators.required]),
      name: new FormControl('s', [Validators.required]),
      batchNumber: new FormControl('s', [Validators.required]),
      company: new FormControl('s', [Validators.required]),
      quantity: new FormControl('s', [Validators.required]),
      free: new FormControl('s', [Validators.required]),
      discountPercent: new FormControl('s', [Validators.required]),
      mrp: new FormControl('s', [Validators.required])
    })
  }

  createBillForm = new FormGroup({
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
    details: new FormArray([],Validators.required),
    tax: new FormControl('', Validators.required),
    total: new FormControl('', Validators.required),
    netTotal: new FormControl('', Validators.required)
  });

  invoiceNo = this.createBillForm.get('invoiceNo');
  get getDetails() {
    return <FormArray>this.createBillForm.get('details')
  }


  addProduct() {
    this.getDetails.push(this.productFormGroup)
  };

  deleteProduct(index: number) {
    this.getDetails.removeAt(index);
  }

  createBill() {
    console.log('Bill form detail: ',this.createBillForm.value);
    
  }


  getClientList() {
    return [
      {
        _id: 1,
        name: 'Pankaj medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 2,
        name: 'Akash medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'Deepak medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'Shivam medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      }
    ]
  }


  getProductList() {
    return [{
      "_id": "63d53f37bf42979ef7386090",
      "name": "egyp-2",
      "company": {
        "_id": "63d53f1bbf42979ef738608e",
        "name": "sag",
        "address1": "gurugram",
        "landmark": "noida",
        "pincode": 213456,
        "state": "haryana",
        "country": "india",
        "gstIn": "75675ADSG",
        "email": "string@email.com",
        "mobile1": "9087867678",
        "mobile2": "9087867637",
        "createdAt": "2023-01-28T15:28:27.382Z",
        "updatedAt": "2023-01-28T15:28:27.382Z",
        "__v": 0
      },
      "productType": "syrup",
      "productCategory": "others",
      "hsnCode": "sdc",
      "batch": [{
        "batchNumber": "STRING-1",
        "opQuantity": 1,
        "purchaseQuantity": 129,
        "saleQuantity": 31,
        "supplier": "string",
        "discountPercent": 1,
        "cgstPercent": 1,
        "sgstPercent": 1,
        "IgstPercent": 1,
        "totalTax": 150,
        "totalAmountExcludingTax": 550,
        "finalAmount": 750,
        "expirydate": "2023-12-31T18:30:00.000Z",
        "margin": 1,
        "mrp": 1,
        "rate": 1,
        "purchaseRate": 1,
        "invoiceRate": 1,
        "saleRate": 1,
        "outer": 1,
        "createdAt": "2023-01-29T10:02:35.999Z",
        "updatedAt": "2023-01-29T10:02:35.999Z"
      }, {
        "batchNumber": "STRING-2",
        "opQuantity": 1,
        "purchaseQuantity": 1,
        "saleQuantity": 1,
        "supplier": "string",
        "discountPercent": 1,
        "cgstPercent": 1,
        "sgstPercent": 1,
        "IgstPercent": 1,
        "totalTax": 50,
        "totalAmountExcludingTax": 500,
        "finalAmount": 550,
        "expirydate": "2023-12-31T18:30:00.000Z",
        "margin": 1,
        "mrp": 1,
        "rate": 1,
        "purchaseRate": 1,
        "invoiceRate": 1,
        "saleRate": 1,
        "outer": 1,
        "createdAt": "2023-01-29T10:02:49.900Z",
        "updatedAt": "2023-01-29T10:02:49.900Z"
      }],
      "createdAt": "2023-01-28T15:28:55.662Z",
      "updatedAt": "2023-01-29T11:51:20.068Z",
      "__v": 0,
      "stockQuantity": 32
    }, {
      "_id": "63d6206c14442024feebe882",
      "name": "algi-m",
      "company": {
        "_id": "63d53f1bbf42979ef738608e",
        "name": "sag",
        "address1": "gurugram",
        "landmark": "noida",
        "pincode": 213456,
        "state": "haryana",
        "country": "india",
        "gstIn": "75675ADSG",
        "email": "string@email.com",
        "mobile1": "9087867678",
        "mobile2": "9087867637",
        "createdAt": "2023-01-28T15:28:27.382Z",
        "updatedAt": "2023-01-28T15:28:27.382Z",
        "__v": 0
      },
      "productType": "syrup",
      "productCategory": "others",
      "hsnCode": "sfcsdcsf",
      "batch": [{
        "batchNumber": "STRING-1",
        "opQuantity": 1,
        "purchaseQuantity": 1,
        "saleQuantity": 1,
        "supplier": "string",
        "discountPercent": 1,
        "cgstPercent": 1,
        "sgstPercent": 1,
        "IgstPercent": 1,
        "totalTax": 50,
        "totalAmountExcludingTax": 500,
        "finalAmount": 550,
        "expirydate": "2023-12-31T18:30:00.000Z",
        "margin": 1,
        "mrp": 1,
        "rate": 1,
        "purchaseRate": 1,
        "invoiceRate": 1,
        "saleRate": 1,
        "outer": 1,
        "createdAt": "2023-01-29T11:29:15.616Z",
        "updatedAt": "2023-01-29T11:29:15.616Z"
      }, {
        "batchNumber": "STRING-2",
        "opQuantity": 1,
        "purchaseQuantity": 1,
        "saleQuantity": 1,
        "supplier": "string",
        "discountPercent": 1,
        "cgstPercent": 1,
        "sgstPercent": 1,
        "IgstPercent": 1,
        "totalTax": 50,
        "totalAmountExcludingTax": 500,
        "finalAmount": 550,
        "expirydate": "2023-12-31T18:30:00.000Z",
        "margin": 1,
        "mrp": 1,
        "rate": 1,
        "purchaseRate": 1,
        "invoiceRate": 1,
        "saleRate": 1,
        "outer": 1,
        "createdAt": "2023-01-29T11:29:19.037Z",
        "updatedAt": "2023-01-29T11:29:19.037Z"
      }],
      "createdAt": "2023-01-29T07:29:48.413Z",
      "updatedAt": "2023-01-29T11:29:19.047Z",
      "__v": 0,
      "stockQuantity": 2
    }, {
      "_id": "63d75e3212f1c7216d2248d8",
      "name": "EGYP-2",
      "company": {
        "_id": "63d53f1bbf42979ef738608e",
        "name": "sag",
        "address1": "gurugram",
        "landmark": "noida",
        "pincode": 213456,
        "state": "haryana",
        "country": "india",
        "gstIn": "75675ADSG",
        "email": "string@email.com",
        "mobile1": "9087867678",
        "mobile2": "9087867637",
        "createdAt": "2023-01-28T15:28:27.382Z",
        "updatedAt": "2023-01-28T15:28:27.382Z",
        "__v": 0
      },
      "productType": "syrup",
      "productCategory": "others",
      "hsnCode": "kdsfjvhd",
      "batch": [],
      "createdAt": "2023-01-30T06:05:38.751Z",
      "updatedAt": "2023-01-30T06:05:38.751Z",
      "__v": 0
    }, {
      "_id": "63d75e7112f1c7216d2248dc",
      "name": "VAIBHAV",
      "company": {
        "_id": "63d53f1bbf42979ef738608e",
        "name": "sag",
        "address1": "gurugram",
        "landmark": "noida",
        "pincode": 213456,
        "state": "haryana",
        "country": "india",
        "gstIn": "75675ADSG",
        "email": "string@email.com",
        "mobile1": "9087867678",
        "mobile2": "9087867637",
        "createdAt": "2023-01-28T15:28:27.382Z",
        "updatedAt": "2023-01-28T15:28:27.382Z",
        "__v": 0
      },
      "productType": "syrup",
      "productCategory": "others",
      "hsnCode": "df",
      "batch": [],
      "createdAt": "2023-01-30T06:06:41.208Z",
      "updatedAt": "2023-01-30T06:06:41.208Z",
      "__v": 0
    }];

  };


  ngOnInit(){
    this.productList = this.getProductList();
    this.clientList = this.getClientList();
  }
}
