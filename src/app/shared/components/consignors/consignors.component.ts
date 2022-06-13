import { NewConsignorService } from './new-consignor/new-consignor.service';
import { prePad } from './../../models/types/Utils';
import { dateToDays } from './../../models/types/Date';
import {
  FullTransaction,
  TransactionTable,
} from './../../models/types/Transaction';
import { QueryService } from './../../services/query.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Consignor } from '../../models/types/Consignor';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSidenav } from '@angular/material/sidenav';

enum Category {
  Verslae = 'Verslae',
  Statistiek = 'Statistiek',
}

@Component({
  selector: 'app-consignors',
  templateUrl: './consignors.component.html',
  styleUrls: ['./consignors.component.scss'],
})
export class ConsignorsComponent {
  prePad = prePad;
  Category = Category;

  consignors: Observable<Consignor[]>;
  curConsignor: Consignor | null;
  transactions: TransactionTable;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  category: Category = Category.Verslae;
  visual: boolean = true;
  tableIsAvailable: boolean = false;

  chartResponse: {
    item: string;
    count: number;
    total: number;
    sale_timestamp: string;
  }[] = [];

  chartData: { name: string; series: { name: string; value: number }[] }[] = [];

  dateStart: Date;
  dateEnd: Date;

  constructor(private query: QueryService, public modal: NewConsignorService) {
    this.consignors = this.query.getAllConsignors();
  }

  showCategory(nav: MatSidenav, category: Category) {
    nav.toggle();
    this.category = category;
  }

  getHeaders = () =>
    this.transactions.compactDisplayFormat.map(({ columnDef }) => columnDef);

  getTotal = () =>
    this.transactions.data.data
      .map(({ total }) => +total)
      .reduce((acc, val) => +acc + val, 0);

  getChartData = () => {
    this.chartData = [];
    if (!this.chartResponse[0]) return;

    // const days = dateToDays(this.range.value.end - this.range.value.start + 1);
    const days = dateToDays(this.dateEnd.getTime() - this.dateStart.getTime());
    // const startDate = new Date(this.range.value.start);

    // console.log(this.dateStart, this.dateEnd);

    let dataIndex = 0;
    let testVal = dateToDays(
      new Date(this.chartResponse[dataIndex].sale_timestamp).getTime()
    );

    for (let i = 0; i <= days; i++) {
      const defaultDate = new Date(this.dateStart).setDate(
        this.dateStart.getDate() + i
      );
      const date = new Date(defaultDate).toDateString().slice(4, 10);
      const day = dateToDays(defaultDate);
      let series: { name: string; value: number }[] = [];

      while (testVal === day) {
        series.push({
          name: this.chartResponse[dataIndex].item,
          value: +this.chartResponse[dataIndex].total,
        });

        testVal = dateToDays(
          new Date(this.chartResponse[++dataIndex]?.sale_timestamp).getTime()
        );
      }
      this.chartData.push({ name: date, series: series });
    }
  };
}
