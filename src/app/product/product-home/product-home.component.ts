import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertType } from 'src/app/shared/error-success/error-success.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent {
  allProductsData: any;
  showBatch = false
  visibleBatchProductId: any;
  // createProductForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ){}
  productAlerts = {
    failedToCreateProdut: true,
    productCreated: false
  }

  productCreationFailureInfo = {
    type : AlertType.error, 
    message :'Form submitted successfull'
  }


  productStructure = { 
    "name": "string9",
    "company": "63d3754bce8d98b8c4263228",
    "productType": "syrup",
    "productCategory": "others",
    "hsnCode": "string",
    "unit": "string"
  }

  conpanyDetail = [
    {
      name: 'SAG',
      _id: '654e64'
    }
  ]

  // initializeFormGroup(){
    createProductForm = new FormGroup({
      name : new FormControl('Ramndom', Validators.required),
      company : new FormControl('', 
        [Validators.required]
      ),
      productCategory : new FormControl(''),
      productType : new FormControl('',Validators.required),
      hsnCode : new FormControl('', Validators.required),
    });
  // };

  // get createProductFormControl(){
  //   return this.createProductForm.controls;
  // }

  get name() {
    return this.createProductForm.get('name');
  }
  get company() {
    return this.createProductForm.get('company');
  }
  get productCategory() {
    return this.createProductForm.get('productCategory');
  }
  get productType() {
    return this.createProductForm.get('comment');
  }
  get hsnCode() {
    return this.createProductForm.get('hsnCode');
  }

  createProduct(){
    console.log('callig create product api');
    if(this.createProductForm.invalid){
      console.log('form is invalid');
      this.createProductForm.markAllAsTouched();
      return;
    }
    
    this.productService.createProduct(this.createProductForm.value).subscribe((data)=>{
      console.log('CreatedProduct: ',data);
      this.createProductForm.reset();
    },(error)=>{
      console.error('Error occured',error);
    })
  }

  openClearStockModal(clearStockModal:any) {

    this.modalService.open(clearStockModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				console.log('modal closed with',result);
			},
      (reason) => {
				console.log('dismissed with', reason);
        
			},
    )
    // this.modalOrderId = orderId;
    // this.modalOrderStatus = 'canceled';
    // .result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });
  }

  updateBatchStock(productId:any,batchInfo:any){
    // productId,batchInfo
    // batchNumber, productId
    // {
    //   batchNumber,
    //   finalAmount,
    //   invoiceRate,
    //   purchaseQuantity,
    //   saleQuantity,
    //   totalAmountExcludingTax,
    //   totalTax
    // }
  }

  clearStock(){

  }

  getAllProducts(){
    // this.allProductsData = 
    this.productService.getAllProducts().subscribe(data=>{
      console.log('all product data: ', data);
      
      this.allProductsData = data;
    },
    error => {
      console.log('could not get all product data',error);
      
    })
  }

  ngOnInit(){
    // this.getAllProducts()
  }
}
