import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/company/service/company.service';
import { paymentMode } from 'src/app/properties/payment-modes';
import { productCategory, productType } from 'src/app/properties/product';
import { AlertType } from 'src/app/shared/error-success/error-success.component';
import { productUrl } from 'src/app/urls/angular.url';
import { formatErrorMessage } from 'src/app/utils/errorMessageFormatter';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent {
  constructor(
    private productService: ProductService,
    private comapanyService: CompanyService,
    private router:Router
  ) { }

  createBatchUrl = productUrl.createBatch;
  productHomeUrl = productUrl.home;
  
  createdProduct: any = null;
  
  createProductFormUi = true;

  createProductLoader = false;
  failedToGetCompanyDetailAlertMessage = 'fail';
  companyList: any = null;

  productAlerts = {
    failedToCreateProduct: false,
    productCreated: false,
  };
  productCreationFailureInfo = {
    type: AlertType.error,
    message: 'Product failed to create',
  };

  productCreationSuccessInfo = {
    type: AlertType.success,
    message: 'Product created successfully',
  };

  failedToGetCompanyAlert = false;
  failedToGetCompanyAlertInfo = {
    type: AlertType.error,
    message: 'Failed to get company list',
  };

  paymentModes: String[] = paymentMode;
  productTypes: String[] = productType;
  productCategories: String[] = productCategory;

  createProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    company: new FormControl('', [Validators.required]),
    productCategory: new FormControl(''),
    productType: new FormControl('', Validators.required),
    hsnCode: new FormControl('', Validators.required),
  });

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

  goToCreateBatch() {
    this.createdProduct = {
      _id: "63e7616ebba179fa18ef3f0a"
    };

    this.router.navigate([this.createBatchUrl + '/' + this.createdProduct._id]);
  }

  createProduct() {
    console.log('callig create product api', this.createProductForm.value);
    if (this.createProductForm.invalid) {
      console.log(this.createProductForm.value, 'form is invalid');
      this.createProductForm.markAllAsTouched();
      return;
    }
    this.createProductLoader = true;
    this.productService.createProduct(this.createProductForm.value).subscribe(
      (data:any) => {
        this.createProductLoader = false;
        this.productAlerts.productCreated = true;
        console.log('CreatedProduct: ', data);
        this.createProductForm.reset();
        this.createdProduct = data;
        this.createProductFormUi = false;
      },
      (error) => {
        console.error('Failed to create product: ', error);
        this.productCreationFailureInfo.message = formatErrorMessage(error);
        this.createProductLoader = false;
        this.productAlerts.failedToCreateProduct = true;
      }
    );
  }

  getCompanyList() {
    this.comapanyService.getAllCompany().subscribe(
      (data) => {
        console.log('company list', data);

        this.companyList = data;
      },
      (error) => {
        // if (error.) {

        // }
        this.failedToGetCompanyAlert = true;
        console.log('Failed to get company details', error);
      }
    );
  }

  ngOnInit() {
    this.getCompanyList();
  }
}
