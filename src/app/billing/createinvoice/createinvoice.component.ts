import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-createinvoice',
  templateUrl: './createinvoice.component.html',
  styleUrls: ['./createinvoice.component.scss']
})
export class CreateinvoiceComponent {
  constructor(private builder: FormBuilder) {
  }
  pagetitle = "Create Invoice";



  invoiceForm = new FormGroup({
    invoiceNo: new FormControl('', Validators.required),
    company: new FormControl('',
      [Validators.required]
    ),
    productCategory: new FormControl(''),
    productType: new FormControl('', Validators.required),
    hsnCode: new FormControl('', Validators.required),
  });

  invoiceNo = this.invoiceForm.get('invoiceNo');





}
