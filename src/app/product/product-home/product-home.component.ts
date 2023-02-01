import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertType } from 'src/app/shared/error-success/error-success.component';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent {
  closeResult = '';
  allProductsData: any;
  showBatch = false
  visibleBatchProductId: any;
  // createProductForm!: FormGroup;
  productDataInModal: any;
  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) { }

  productAlerts = {
    failedToCreateProdut: true,
    productCreated: false
  }

  productCreationFailureInfo = {
    type: AlertType.error,
    message: 'Form submitted successfull'
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
    name: new FormControl('', Validators.required),
    company: new FormControl('',
      [Validators.required]
    ),
    productCategory: new FormControl(''),
    productType: new FormControl('', Validators.required),
    hsnCode: new FormControl('', Validators.required),
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

  createProduct() {
    console.log('callig create product api');
    if (this.createProductForm.invalid) {
      console.log('form is invalid');
      this.createProductForm.markAllAsTouched();
      return;
    }

    this.productService.createProduct(this.createProductForm.value).subscribe((data) => {
      console.log('CreatedProduct: ', data);
      this.createProductForm.reset();
    }, (error) => {
      console.error('Error occured', error);
    })
  }


  openClearStockModal(content: any, product: any, batch: any) {
    this.productDataInModal = {
      ...product, ...batch
    };
    console.log('Data in modal', this.productDataInModal);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    ).finally(() => {
      this.productDataInModal = null;
    });
  }

  private getDismissReason(reason: any): string {
    this.productDataInModal = null;
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateBatchStock(productId: any, batchInfo: any) {
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

  clearStock() {

  }

  getAllProducts() {
    // this.allProductsData = 
    this.productService.getAllProducts().subscribe(data => {
      console.log('all product data: ', data);

      this.allProductsData = data;
    },
      error => {
        console.log('could not get all product data', error);

      })
  }

  ngOnInit() {
    // this.getAllProducts()
  }


  removedStockProduct = new FormGroup({
    RemovedStock: new FormControl(""),
    // console.log(this.removedStockProduct.value)

  });

  updateStock() {
    console.log(this.removedStockProduct.value);

  }

}
