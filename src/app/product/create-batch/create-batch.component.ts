import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertType } from 'src/app/shared/error-success/error-success.component';
import { formatErrorMessage } from 'src/app/utils/errorMessageFormatter';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss'],
})
export class CreateBatchComponent {
  addBatchInfoLoader = false;
  getProductDetailLoader = true;
  productDetail: any = null;

  failedToGetProductAlert = false;
  failedToGetProductAlertInfo = {
    type: AlertType.error,
    message: 'Failed to get product, ',
  };

  addBatchAlerts = {
    failedToAddBatch: false,
    batchAdded: false,
  };
  addBatchFailureInfo = {
    type: AlertType.error,
    message: 'Product failed to create',
  };

  addBatchSuccessInfo = {
    type: AlertType.success,
    message: 'Product created successfully',
  };

  batchCalcuationsInfo = {
    totalTax: 0,
    totalAmountExcludingTax: 0,
    finalAmount: 0,
    discountedAmount: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  addBatchForm = new FormGroup({
    batchNumber: new FormControl('', Validators.required),
    purchaseQuantity: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    saleQuantity: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    purchaseRate: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    saleRate: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    mrp: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    discountPercent: new FormControl<number>(0, [
      Validators.min(0),
      Validators.max(100),
      Validators.pattern('^[0-9]*$'),
    ]),
    expirydate: new FormControl('', Validators.required),
    saleCgstPercent: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    saleSgstPercent: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    saleIgstPercent: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    purchaseCgstPercent: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    purchaseSgstPercent: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    purchaseIgstPercent: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    opQuantity: new FormControl<number>(0, Validators.pattern('^[0-9]*$')),
  });

  calculateTaxAndPrices() {
    console.log('calculation triggered');

    if (
      this.addBatchForm.value.saleQuantity &&
      this.addBatchForm.value.purchaseRate &&
      this.addBatchForm.value.purchaseIgstPercent &&
      this.addBatchForm.value.purchaseCgstPercent &&
      this.addBatchForm.value.purchaseSgstPercent
    ) {
      this.batchCalcuationsInfo.totalAmountExcludingTax =
        this.addBatchForm.value.saleQuantity *
        this.addBatchForm.value.purchaseRate;
      this.batchCalcuationsInfo.totalTax =
        (this.batchCalcuationsInfo.totalAmountExcludingTax *
          this.addBatchForm.value.purchaseSgstPercent) /
          100 +
        (this.batchCalcuationsInfo.totalAmountExcludingTax *
          this.addBatchForm.value.purchaseCgstPercent) /
          100 +
        (this.batchCalcuationsInfo.totalAmountExcludingTax *
          this.addBatchForm.value.purchaseIgstPercent) /
          100;

      this.batchCalcuationsInfo.discountedAmount =
        (this.addBatchForm.value.discountPercent||0 *
          this.batchCalcuationsInfo.totalAmountExcludingTax) /
        100;

      this.batchCalcuationsInfo.finalAmount =
        this.batchCalcuationsInfo.totalAmountExcludingTax +
        this.batchCalcuationsInfo.totalTax - this.batchCalcuationsInfo.discountedAmount;

      console.log(
        'totalAmountExcludingTax: ',
        this.batchCalcuationsInfo.totalAmountExcludingTax,
        'totalTax: ',
        this.batchCalcuationsInfo.totalTax,
        'Discounted Amount: ',this.batchCalcuationsInfo.discountedAmount,
        'finalAmount: ',
        this.batchCalcuationsInfo.finalAmount
      );
    }
  }

  addBatchInfo() {
    if (this.addBatchForm.invalid) {
      console.error('Invalid batch form,', this.addBatchForm.value);
      return;
    }
    this.addBatchInfoLoader = true;
    // create new batch ####  check for condition to update batch
    let batchInfoToSend = {
      productId: this.productDetail._id,
      batchInfo: { ...this.addBatchForm.value, ...this.batchCalcuationsInfo }
    }
    console.log('Sendit batch data to create batch',batchInfoToSend);
    
    this.productService.addBatchInProduct(batchInfoToSend).subscribe(
      (data) => {
        console.log('ProductAdded to batch');
        this.addBatchForm.reset();
        this.addBatchInfoLoader = false;
      },
      (error) => {
        console.error('Failed to add batch', error);
        this.addBatchFailureInfo.message = formatErrorMessage(error);
        this.addBatchInfoLoader = false;
        this.addBatchAlerts.failedToAddBatch = true;
      }
    );
  }

  getProductById(productId: any) {
    this.productService.getProductById(productId).subscribe(
      (data) => {
        console.log('fetched product', data);
        this.productDetail = data;
        this.getProductDetailLoader = false;
      },
      (error) => {
        console.error('failed to get product by id', error);
        this.failedToGetProductAlertInfo.message += formatErrorMessage(error);
        this.getProductDetailLoader = false;
        this.failedToGetProductAlert = true;
      }
    );
  }

  // setInitFormValues() {
  //   this.addBatchForm.get('')
  // }

  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId');
    console.log('productId id', productId);
    this.getProductById(productId);
  }
}
