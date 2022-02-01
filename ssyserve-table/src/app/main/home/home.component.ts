import { Component, OnInit } from '@angular/core';
import { farmerPayload } from 'src/app/app-support/dummy-data/dummy-data';
import { IFarmerInfo } from 'src/app/app-support/interfaces/farmer-interfaces';
import { TableLoaderService } from 'src/app/app-support/services/table-loader.service';

interface IFarmerListInfo extends Array<IFarmerInfo>{};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Sysserve Table';
  tableTitle = "Sysserve Farmer Table"
  farmerTableData: any = {
    headerRow: ['Name', 'Rice', 'Beans', 'Naize', 'Potatoes', 'Groundnuts',],
    dataRows: [],
    settings: {}
  };
  

  constructor(private loaderService: TableLoaderService) { }

  ngOnInit(): void {
    this.fetchFarmerData({page: 1});
  }

  fetchFarmerData(data: any): void {
    // This should fetch from an endpoint but in the absence of that we can just have some delayed data assignment.
    this.loaderService.setLoading();
    setTimeout(() => {
      this.setUpTableData(farmerPayload.payload.farmerList);
      this.farmerTableData.settings = {page: data.page, ...farmerPayload.payload.settings};
      this.loaderService.setLoaded();
    }, 3000);
  }

  setUpTableData(data: IFarmerListInfo): void {
    this.farmerTableData.dataRows = data.map((item: IFarmerInfo, index: number) => {
      return [
        item.firstName + ' ' + item.lastName,
        item.riceBags,
        item.beansBags,
        item.maizeBags,
        item.potatoeBags,
        item.groundNutBags,
      ]
    });
  }

}
