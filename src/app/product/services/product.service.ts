import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productApiUrl } from '../../urls/api.url';
import { of } from 'rxjs';

@Injectable()
export class ProductService {
  productApiUrl = productApiUrl
  constructor(
    private http: HttpClient
  ) { }

  createProduct(productData: any) {
    return this.http.post(this.productApiUrl.createProduct, productData);
  }

  getAllProducts() {
    // return this.http.get(this.productApiUrl.getAllProducts);



    const ProductsData = [
      {
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
        "batch": [
          {
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
          },
          {
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
          }
        ],
        "createdAt": "2023-01-28T15:28:55.662Z",
        "updatedAt": "2023-01-29T11:51:20.068Z",
        "__v": 0,
        "stockQuantity": 32
      },
      {
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
        "batch": [
          {
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
          },
          {
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
          }
        ],
        "createdAt": "2023-01-29T07:29:48.413Z",
        "updatedAt": "2023-01-29T11:29:19.047Z",
        "__v": 0,
        "stockQuantity": 2
      },
      {
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
      },
      {
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
      }
    ]

    return of(ProductsData);

  }

}