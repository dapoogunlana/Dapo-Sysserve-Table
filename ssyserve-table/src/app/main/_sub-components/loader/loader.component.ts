import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() customSize: any;

  constructor() { }

  ngOnInit(): void {
    if (this.customSize) {
      const holder: any = document.getElementById('new-holder');
      holder.style.height = this.customSize + 'px';
      holder.style.width = this.customSize + 'px';
    }
  }

}
