import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { ErrorSuccessComponent } from './error-success/error-success.component';
import { LoaderComponent } from './loader/loader.component';

const sharedModule = [
  ReactiveFormsModule,
  FormsModule
]

const sharedComponents = [
  ErrorSuccessComponent,
  LoaderComponent
]
@NgModule({
  declarations: [
    sharedComponents
  ],
  imports: [
    CommonModule,
    sharedModule
  ],
  exports: [
    sharedComponents,
    sharedModule
  ]
})
export class SharedModule { }
