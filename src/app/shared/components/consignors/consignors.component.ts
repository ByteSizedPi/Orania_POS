import { Invoice } from './../../models/types/Types';
import { NewConsignorService } from './new-consignor/new-consignor.service';
import { dateToDays } from './../../models/types/Date';

import { QueryService } from './../../services/query.service';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FullTransaction } from '../../models/types/Transaction';

enum Category {
  Verslae = 'Transaksies',
  Statistiek = 'Totale',
}

@Component({
  selector: 'app-consignors',
  templateUrl: './consignors.component.html',
  styleUrls: ['./consignors.component.scss'],
})
export class ConsignorsComponent {
  Category = Category;
  category: Category = Category.Verslae;

  chartResponse: {
    item: string;
    count: number;
    total: number;
    sale_timestamp: string;
  }[] = [];

  chartData: { name: string; series: { name: string; value: number }[] }[] = [];

  dateStart: Date;
  dateEnd: Date;
  showInvoice: boolean = false;
  invoiceData: Invoice;

  constructor(private query: QueryService, public modal: NewConsignorService) {
    // this.consignors = this.query.getAllConsignors();
  }

  showCategory(nav: MatSidenav, category: Category) {
    this.category = category;
  }

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

  getDayReport(): void {
    const dateStart = new Date(
      `${
        new Date().getMonth() + 1
      }-${new Date().getDate()}-${new Date().getFullYear()} 00:00:00`
    );
    // const dateStart = new Date().addDays(-1);
    const dateEnd = new Date().addDays(1);

    const body = {
      start: dateStart.toISOString(),
      end: dateEnd.toISOString(),
    };

    this.query.getTransactionsByDate(body).subscribe((transactions) => {
      this.invoiceData = { transactions: transactions, details: false };
      this.showInvoice = true;
    });
  }
}
