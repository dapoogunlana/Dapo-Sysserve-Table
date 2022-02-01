import { Component, OnInit, DoCheck, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { TableLoaderService } from 'src/app/app-support/services/table-loader.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, DoCheck, AfterViewChecked {
  @Input() title: string = '';
  @Input() tableData: any = {};
  @Input() calculateTotal: boolean = false;
  @Input() showPagination: boolean = false;
  @Input() textColor: string = '';
  @Output() refreshTable: EventEmitter<any> = new EventEmitter();

  total: any[] = [];
  pages = 1;
  displayRange = {
    start: 0,
    end: 0
  }
  awaitingAction = {
    textColor: '',
    textColorCount: 0,
  }

  constructor(public loaderService: TableLoaderService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (this.calculateTotal && this.loaderService.dataLoaded) {
      this.calculateTotalData();
    }
    if (this.showPagination && this.loaderService.dataLoaded) {
      this.handlePagination();
    }
    if (this.textColor && this.loaderService.dataLoaded) {
      this.styleTextColor();
    }
  }
  ngAfterViewChecked(): void {
    this.awaitingAction.textColorCount += 1;
    if (this.awaitingAction.textColorCount === 2) {
      this.changeTextColor();
    }
  }

  calculateTotalData(): void {
    const total: any[] = [];
    this.tableData.headerRow.map((item: any) => {
      total.push(0);
    });
    this.tableData.dataRows.map((row: any) => {
      row.map((cell: any, index: number) => {
        total[index] += parseFloat(cell);
      });
    });
    total[0] = 'Total';
    this.total = total.map((item: any, index) => {
      return (index === 0 ? item : isNaN(item) ? '' : item);
    });
  }

  handlePagination(): void {
    if (!this.tableData.settings?.total || !this.tableData.settings?.page || !this.tableData.settings?.limit){
      this.showPagination = false;
      return;
    }
    this.pages = Math.ceil(this.tableData.settings.total / this.tableData.settings.limit);
    this.displayRange.start = ((this.tableData.settings.page -1) * (this.tableData.settings.limit)) + 1;
    this.displayRange.end = this.tableData.settings.page * this.tableData.settings.limit;
  }

  changePage(increase: boolean): void {
    if(increase) {
      this.tableData.settings.page += 1;
    } else {
      this.tableData.settings.page -= 1;
    }
    this.refreshTable.emit(this.tableData.settings);
  }

  getTableData(initialize = false): void {
    this.refreshTable.emit(initialize);
  }

  styleTextColor(): void {
    let color: string;
    switch (this.textColor) {
      case 'black':
        color = '#000000';
        break;
      case 'grey':
        color = '#888888';
        break;
      case 'white':
        color = '#ffffff';
        break;
      default:
        color = this.textColor;
        break;
    }
    this.awaitingAction.textColor = color;
    this.awaitingAction.textColorCount += 1;
    if (this.awaitingAction.textColorCount === 2) {
      this.changeTextColor();
    }
  }

  changeTextColor(): void {
    const colorHolder: any = document.querySelector('.all-controls');
      colorHolder.style.color = `${this.awaitingAction.textColor}`;
      console.log('any')
  }
}
