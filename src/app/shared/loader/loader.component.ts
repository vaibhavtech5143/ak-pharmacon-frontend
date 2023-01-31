import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  // input -> {small,full}
  @Input() data: Data | undefined;
  constructor() { }

  ngOnInit(): void {
  }
}

export interface Data {
  type?: string;
}
