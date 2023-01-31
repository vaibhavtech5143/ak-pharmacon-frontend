import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-success',
  templateUrl: './error-success.component.html',
  styleUrls: ['./error-success.component.scss']
})
export class ErrorSuccessComponent {
  hideAlert = false;
  

  // hideAlert = false;
    // input dattype {type==error|success,message}
    // output custom close event
    @Input() data!: any;
    // tslint:disable-next-line: no-output-native
    @Output() close =  new EventEmitter<void>();
    constructor() { }

    ngOnInit() {
      console.log('data from error-suc-component', this.data);
    }

    onClose() {
      this.close.emit();
    }
}

export enum AlertType {
  success = 'success',
  error = 'error'
}

export interface Data {
  type?: AlertType;
  message?: string;
}

