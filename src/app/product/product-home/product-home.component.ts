import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertType } from 'src/app/shared/error-success/error-success.component';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { paymentMode } from 'src/app/properties/payment-modes';
import { productCategory, productType } from '../../properties/product';
import { productRouting } from 'src/app/urls/angular.url';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss'],
})
export class ProductHomeComponent {
  closeResult = '';
  allProductsData: any;
  showBatch = false;
  visibleBatchProductId: any;

  createProductUrl = productRouting.create;
  // createProductForm!: FormGroup;
  productDataInModal: any;
  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}


  openClearStockModal(content: any, product: any, batch: any) {
    this.productDataInModal = {
      ...product,
      ...batch,
    };
    console.log('Data in modal', this.productDataInModal);

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      )
      .finally(() => {
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

  clearStock() {}

  getAllProducts() {
    // this.allProductsData =
    this.productService.getAllProducts().subscribe(
      (data) => {
        console.log('all product data: ', data);

        this.allProductsData = data;
      },
      (error) => {
        console.log('could not get all product data', error);
      }
    );
  }

  ngOnInit() {
    
  }

  removedStockProduct = new FormGroup({
    RemovedStock: new FormControl(''),
  });

  updateStock() {
    console.log(this.removedStockProduct.value);
  }
}
