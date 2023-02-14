import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertType } from '../../shared/error-success/error-success.component';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss'],
})
export class CreateBillComponent {
  pagetitle = 'Create Bill';
  clientList: any;
  productList: any;
  batchList: any;

  newProductUi = false;

  clientSearchedAvailableOptions: any = [];
  productSearchedAvailableOptions: any = [];
  batchSearchedAvailableOptions: any = [];

  selectedClient: any;
  selectedProduct: any;
  selectedBatch: any;

  billDetail: any = {
    products: [],
  };

  productAlerts = {
    createBillValidationError: false
  }

  createBillValidationErrorInfo = {
    type: AlertType.error,
    message: ''
  }

  constructor() {}

  productForm = new FormGroup({
    quantity: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    free: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
    discountPercent: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  get QuantityField() {
    return this.productForm.get('quantity');
  }
  get FreeField() {
    return this.productForm.get('free');
  }
  get DiscountPercentField() {
    return this.productForm.get('discountPercent');
  }

  getFormData() {
    console.log(this.productForm.value);
  }

  batchProductAdditionalValidation() {
    let validationError = [];
    if (!this.selectedProduct) {
      validationError.push('Product Should be selected');
    }
    if (!this.selectedBatch) {
      validationError.push('Batch Should be selected');
    }

    if (Array.isArray(this.billDetail.products)) {
      let currentTotalQuantity;
      if (this.productForm.value.free && this.productForm.value.quantity) {
        currentTotalQuantity =
          this.productForm.value.free + this.productForm.value.quantity;

        if (this.selectedBatch.saleQuantity < currentTotalQuantity) {
          validationError.push(
            `Qty+free should not be more than ${this.selectedBatch.saleQuantity}. Your qty+free is ${currentTotalQuantity}`
          );
        }
      }

      // to check if duplicate batch for specific product is added
      for (const alreadyAddedProduct of this.billDetail.products) {
        if (
          alreadyAddedProduct.productId === this.selectedProduct._id &&
          this.selectedBatch.batchNumber === alreadyAddedProduct.batchNumber
        ) {
          validationError.push(
            `Product ${this.selectedProduct.name} with batch ${this.selectedBatch.batchNumber} already added`
          );
          break;
        }
      }
    }

    return validationError;
  }

  addProduct() {
    const batchProductValidation =this.batchProductAdditionalValidation()
    if (
      this.productForm.invalid ||
      batchProductValidation.length>0
    ) {
      this.productForm.markAllAsTouched();
      this.createBillValidationErrorInfo.message = batchProductValidation.join(",");
      this.productAlerts.createBillValidationError = true;
      return;
      
    }
    let productDetails = {
      productId: this.selectedProduct._id,
      name: this.selectedProduct.name,
      company: this.selectedProduct.company._id,
      productType: this.selectedProduct.productType,
      productCategory: this.selectedProduct.productCategory,
      hsnCode: this.selectedProduct.hsnCode,

      batchNumber: this.selectedBatch.batchNumber,
      expirydate: this.selectedBatch.expirydate,
      cgstPercent: this.selectedBatch.cgstPercent,
      sgstPercent: this.selectedBatch.sgstPercent,
      igstPercent: this.selectedBatch.igstPercent,
      totalTax: this.selectedBatch.totalTax,
      margin: this.selectedBatch.margin,
      mrp: this.selectedBatch.mrp,
      rate: this.selectedBatch.rate,
      purchaseRate: this.selectedBatch.purchaseRate,
      invoiceRate: this.selectedBatch.invoiceRate,
      saleRate: this.selectedBatch.saleRate,
      cgstAmount: this.selectedBatch.cgstAmount,
      sgstAmount: this.selectedBatch.sgstAmount,
      igstAmount: this.selectedBatch.igstAmount,
      totalAmountExcludingTax: this.selectedBatch.totalAmountExcludingTax,
      totalAmount: this.selectedBatch.totalAmount,
      outer: this.selectedBatch?.outer,

      ...this.productForm.value,
    };
    // First Validate duplicate products/batchNumber are not inserted in bill then only push
    // (need to confirm if we will allow same product with different batch number)

    // make sure quantity + free <= batch quantity
    // make sure quantity and free and discount is number
    this.billDetail.products.push(productDetails);
    console.log('Product detail: ', productDetails);
    console.log('current Bill: ', this.billDetail);

    this.calculateTotalAmountAndTax();

    // If valid then push in product Array else return
    // this.getDetails.push(this.productFormGroup)

    // after successfullProcessing
    (this.selectedBatch = null), (this.selectedProduct = null);
    this.productForm.reset();
    this.newProductUi = false;
  }

  deleteProduct(index: number) {
    // this.getDetails.removeAt(index);
  }

  createBill() {
    // make sure bill has atleast one product
    console.log('Bill to be created: ', this.billDetail);
  }

  // CLIENT SEARCH OPTION START
  onClientNameFocus() {
    this.clientSearchedAvailableOptions = this.clientList;
  }

  onClientNameSearch($event: any) {
    const value = $event.target.value.toLowerCase();
    this.clientSearchedAvailableOptions = this.clientList.filter(
      (client: any) => client.name.includes(value)
    );
  }

  onClientNameSelect(client: any) {
    this.selectedClient = client;
    console.log(this.selectedClient);
    this.clientSearchedAvailableOptions = [];
    this.billDetail.client = this.selectedClient._id;
    this.billDetail.clientName = this.selectedClient.name;
  }
  // CLIENT SEARCH OPTION END

  // PRODUCT SEARCH OPTION START
  onProductNameFocus() {
    this.productSearchedAvailableOptions = this.productList;
  }

  onProductNameSearch($event: any) {
    const value = $event.target.value.toUpperCase();
    this.productSearchedAvailableOptions = this.productList.filter(
      (product: any) => product.name.includes(value)
    );
  }

  onProductNameSelect(product: any) {
    this.selectedProduct = product;
    console.log(this.selectedProduct);
    this.batchList = product.batch;
    this.selectedBatch = null;
    this.productForm.reset();
    this.productSearchedAvailableOptions = [];
  }
  // PRODUCT SEARCH OPTION END

  // BATCH SEARCH OPTION START
  onBatchNameFocus() {
    this.batchSearchedAvailableOptions = this.batchList;
  }

  onBatchNameSearch($event: any) {
    const value = $event.target.value.toUpperCase();
    this.batchSearchedAvailableOptions = this.batchList.filter((batch: any) =>
      batch.batchNumber.includes(value)
    );
  }

  onBatchNameSelect(batch: any) {
    this.selectedBatch = batch;
    console.log(this.selectedBatch);
    this.productForm.reset();
    this.batchSearchedAvailableOptions = [];
  }
  // BATCH SEARCH OPTION END

  get SeletctedProductQuantity() {
    const qty = this.productForm.get('quantity')?.value;
    console.log('quantity from form: ', qty);

    return qty || 1;
  }
  selectedBatchCalculations() {
    this.selectedBatch.totalAmountExcludingTax =
      this.selectedBatch.rate * this.SeletctedProductQuantity;

    this.selectedBatch.cgstAmount =
      (this.selectedBatch.totalAmountExcludingTax *
        this.selectedBatch.cgstPercent) /
      100;

    this.selectedBatch.sgstAmount =
      (this.selectedBatch.totalAmountExcludingTax *
        this.selectedBatch.sgstPercent) /
      100;

    this.selectedBatch.igstAmount =
      (this.selectedBatch.totalAmountExcludingTax *
        this.selectedBatch.igstPercent) /
      100;

    this.selectedBatch.totalTax =
      this.selectedBatch.cgstAmount +
      this.selectedBatch.sgstAmount +
      this.selectedBatch.igstAmount;

    this.selectedBatch.totalAmount =
      this.selectedBatch.totalAmountExcludingTax + this.selectedBatch.totalTax;

    console.log('Exluding tax: ', this.selectedBatch.totalAmountExcludingTax);
    console.log('Total Tax: ', this.selectedBatch.totalTax);
    console.log('Total Amount: ', this.selectedBatch.totalAmount);
  }

  calculateTotalAmountAndTax() {
    this.billDetail.totalCgstAmount = 0;
    this.billDetail.totalSgstAmount = 0;
    this.billDetail.totalIgstAmount = 0;
    this.billDetail.totalTaxAmount = 0;
    this.billDetail.totalAmountExcludingTax = 0;
    this.billDetail.finalAmount = 0;
    for (const product of this.billDetail.products) {
      this.billDetail.totalCgstAmount += product.cgstAmount;
      this.billDetail.totalSgstAmount += product.sgstAmount;
      this.billDetail.totalIgstAmount += product.igstAmount;
      this.billDetail.totalTaxAmount += product.totalTax;
      this.billDetail.totalAmountExcludingTax +=
        product.totalAmountExcludingTax;
      this.billDetail.finalAmount += product.totalAmount;
    }

    console.log(
      this.billDetail.totalCgstAmount,
      this.billDetail.totalSgstAmount,
      this.billDetail.totalIgstAmount,
      this.billDetail.totalTaxAmount,
      this.billDetail.totalAmountExcludingTax,
      this.billDetail.finalAmount
    );
  }

  getClientList() {
    return [
      {
        _id: 1,
        name: 'pankaj medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 2,
        name: 'akash medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'deepak medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'shivam medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 1,
        name: 'nandan medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 2,
        name: 'prince medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'jaya medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'jayant medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 1,
        name: 'nandan medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 2,
        name: 'prince medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'jaya medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'jayant medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 1,
        name: 'nandan medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
      {
        _id: 2,
        name: 'prince medical',
        address1: 'Shop 111 ',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'jaya medical',
        address1:
          'Shop 111 <textarea formControlName="deliveryAddress" class="form-control"></textarea> ',
        address2: 'Vasia',
      },
      {
        _id: 3,
        name: 'jayant medical',
        address1: 'Shop 111',
        address2: 'Vasia',
      },
    ];
  }

  getProductList() {
    return [
      {
        _id: '63d53f37bf42979ef7386090',
        name: 'CUFFGON',
        company: {
          _id: '63d53f1bbf42979ef738608e',
          name: 'sag',
          address1: 'gurugram',
          landmark: 'noida',
          pincode: 213456,
          state: 'haryana',
          country: 'india',
          gstIn: '75675ADSG',
          email: 'string@email.com',
          mobile1: '9087867678',
          mobile2: '9087867637',
          createdAt: '2023-01-28T15:28:27.382Z',
          updatedAt: '2023-01-28T15:28:27.382Z',
          __v: 0,
        },
        productType: 'syrup',
        productCategory: 'others',
        hsnCode: 'sdc',
        batch: [
          {
            batchNumber: 'STRING-1',
            opQuantity: 1,
            purchaseQuantity: 129,
            saleQuantity: 31,
            supplier: 'string',
            discountPercent: 1,
            cgstPercent: 1,
            sgstPercent: 1,
            igstPercent: 1,
            totalTax: 150,
            totalAmountExcludingTax: 550,
            finalAmount: 750,
            expirydate: '2023-12-31T18:30:00.000Z',
            margin: 1,
            mrp: 1,
            rate: 1,
            purchaseRate: 1,
            invoiceRate: 1,
            saleRate: 1,
            outer: 1,
            createdAt: '2023-01-29T10:02:35.999Z',
            updatedAt: '2023-01-29T10:02:35.999Z',
          },
          {
            batchNumber: 'STRING-2',
            opQuantity: 1,
            purchaseQuantity: 1,
            saleQuantity: 1,
            supplier: 'string',
            discountPercent: 1,
            cgstPercent: 1,
            sgstPercent: 1,
            igstPercent: 1,
            totalTax: 50,
            totalAmountExcludingTax: 500,
            finalAmount: 550,
            expirydate: '2023-12-31T18:30:00.000Z',
            margin: 1,
            mrp: 1,
            rate: 1,
            purchaseRate: 1,
            invoiceRate: 1,
            saleRate: 1,
            outer: 1,
            createdAt: '2023-01-29T10:02:49.900Z',
            updatedAt: '2023-01-29T10:02:49.900Z',
          },
        ],
        createdAt: '2023-01-28T15:28:55.662Z',
        updatedAt: '2023-01-29T11:51:20.068Z',
        __v: 0,
        stockQuantity: 32,
      },
      {
        _id: '63d6206c14442024feebe882',
        name: 'algi-m',
        company: {
          _id: '63d53f1bbf42979ef738608e',
          name: 'sag',
          address1: 'gurugram',
          landmark: 'noida',
          pincode: 213456,
          state: 'haryana',
          country: 'india',
          gstIn: '75675ADSG',
          email: 'string@email.com',
          mobile1: '9087867678',
          mobile2: '9087867637',
          createdAt: '2023-01-28T15:28:27.382Z',
          updatedAt: '2023-01-28T15:28:27.382Z',
          __v: 0,
        },
        productType: 'syrup',
        productCategory: 'others',
        hsnCode: 'sfcsdcsf',
        batch: [
          {
            batchNumber: 'STRING-1',
            opQuantity: 1,
            purchaseQuantity: 1,
            saleQuantity: 1,
            supplier: 'string',
            discountPercent: 1,
            cgstPercent: 1,
            sgstPercent: 1,
            igstPercent: 1,
            totalTax: 50,
            totalAmountExcludingTax: 500,
            finalAmount: 550,
            expirydate: '2023-12-31T18:30:00.000Z',
            margin: 1,
            mrp: 1,
            rate: 1,
            purchaseRate: 1,
            invoiceRate: 1,
            saleRate: 1,
            outer: 1,
            createdAt: '2023-01-29T11:29:15.616Z',
            updatedAt: '2023-01-29T11:29:15.616Z',
          },
          {
            batchNumber: 'STRING-2',
            opQuantity: 1,
            purchaseQuantity: 1,
            saleQuantity: 1,
            supplier: 'string',
            discountPercent: 1,
            cgstPercent: 1,
            sgstPercent: 1,
            igstPercent: 1,
            totalTax: 50,
            totalAmountExcludingTax: 500,
            finalAmount: 550,
            expirydate: '2023-12-31T18:30:00.000Z',
            margin: 1,
            mrp: 1,
            rate: 1,
            purchaseRate: 1,
            invoiceRate: 1,
            saleRate: 1,
            outer: 1,
            createdAt: '2023-01-29T11:29:19.037Z',
            updatedAt: '2023-01-29T11:29:19.037Z',
          },
        ],
        createdAt: '2023-01-29T07:29:48.413Z',
        updatedAt: '2023-01-29T11:29:19.047Z',
        __v: 0,
        stockQuantity: 2,
      },
      {
        _id: '63d75e3212f1c7216d2248d8',
        name: 'EGYP-2',
        company: {
          _id: '63d53f1bbf42979ef738608e',
          name: 'sag',
          address1: 'gurugram',
          landmark: 'noida',
          pincode: 213456,
          state: 'haryana',
          country: 'india',
          gstIn: '75675ADSG',
          email: 'string@email.com',
          mobile1: '9087867678',
          mobile2: '9087867637',
          createdAt: '2023-01-28T15:28:27.382Z',
          updatedAt: '2023-01-28T15:28:27.382Z',
          __v: 0,
        },
        productType: 'syrup',
        productCategory: 'others',
        hsnCode: 'kdsfjvhd',
        batch: [],
        createdAt: '2023-01-30T06:05:38.751Z',
        updatedAt: '2023-01-30T06:05:38.751Z',
        __v: 0,
      },
      {
        _id: '63d75e7112f1c7216d2248dc',
        name: 'VAIBHAV',
        company: {
          _id: '63d53f1bbf42979ef738608e',
          name: 'sag',
          address1: 'gurugram',
          landmark: 'noida',
          pincode: 213456,
          state: 'haryana',
          country: 'india',
          gstIn: '75675ADSG',
          email: 'string@email.com',
          mobile1: '9087867678',
          mobile2: '9087867637',
          createdAt: '2023-01-28T15:28:27.382Z',
          updatedAt: '2023-01-28T15:28:27.382Z',
          __v: 0,
        },
        productType: 'syrup',
        productCategory: 'others',
        hsnCode: 'df',
        batch: [],
        createdAt: '2023-01-30T06:06:41.208Z',
        updatedAt: '2023-01-30T06:06:41.208Z',
        __v: 0,
      },
    ];
  }

  ngOnInit() {
    this.productList = this.getProductList();
    this.clientList = this.getClientList();
  }
}
