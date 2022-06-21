import { map, tap } from 'rxjs/operators';
import { ID_Name } from './../../../models/types/Consignor';
import { FullTransaction } from './../../../models/types/Transaction';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Consignor } from 'src/app/shared/models/types/Consignor';
import { TransactionTable } from 'src/app/shared/models/types/Transaction';
import { dateToDays, loopDays } from 'src/app/shared/models/types/Date';
import { QueryService } from 'src/app/shared/services/query.service';
import { NewConsignorService } from '../new-consignor/new-consignor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvoiceComponent } from '../../invoice/invoice.component';

enum Category {
  Verslae = 'Verslae',
  Statistiek = 'Statistiek',
}

enum Interval {
  BY_DAY = 'by day',
  BY_MONTH = 'by month',
}

type Series = { name: string; value: number };

@Component({
  selector: 'app-consignor-report',
  templateUrl: './consignor-report.component.html',
  styleUrls: ['./consignor-report.component.scss'],
})
export class ConsignorReportComponent {
  public allConsignors: Observable<ID_Name[]>;
  public curConsignor: Consignor | null;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  category: Category = Category.Verslae;
  visual: boolean = true;
  tableIsAvailable: boolean = false;
  chartIsAvailable: boolean = false;
  table: Observable<TransactionTable>;
  showInvoice: boolean = false;

  chartData: { name: string; series: Series[] }[] | undefined;
  invoiceData:
    | {
        transactions: FullTransaction[];
        name: string;
      }
    | undefined;

  @ViewChild(InvoiceComponent) invoice: InvoiceComponent;
  dateStart: Date | undefined;
  dateEnd: Date | undefined;
  dateShortcut: string = 'Dag';

  constructor(public query: QueryService, public modal: NewConsignorService) {
    this.allConsignors = this.query.getNames();
    this.setDay();
  }

  setDay(): void {
    this.dateStart = new Date(
      `${
        new Date().getMonth() + 1
      }-${new Date().getDate()}-${new Date().getFullYear()} 00:00:00`
    );
    this.dateEnd = new Date().addDays(1);
    this.dateShortcut = 'Dag';
    this.getData();
  }

  setWeek(): void {
    this.dateStart = new Date().addDays(-6);
    this.dateEnd = new Date().addDays(1);
    this.dateShortcut = 'Week';
    this.getData();
  }

  setMonth() {
    this.dateStart = new Date(
      `${new Date().getMonth() + 1}-01-${new Date().getFullYear()} 00:00:00`
    );
    this.dateEnd = new Date().addDays(1);
    this.dateShortcut = 'Maand';
    this.getData();
  }

  setYear() {
    this.dateStart = new Date(`01-01-${new Date().getFullYear()} 00:00:00`);
    this.dateEnd = new Date().addDays(1);
    this.dateShortcut = 'Jaar';
    this.getData();
  }

  setStart(date: Date) {
    this.dateStart = date;
    this.getData();
  }

  setEnd(date: Date) {
    this.dateEnd = date.addDays(1);
    this.getData();
  }

  setConsignor(event: Consignor | null = this.curConsignor) {
    this.curConsignor = event;
    this.getData();
  }

  resetData() {
    this.tableIsAvailable = false;
    this.chartIsAvailable = false;
    this.chartData = undefined;
    this.invoiceData = undefined;
  }

  toggleVisual = () => (this.visual = !this.visual);

  getData(interval: Interval = Interval.BY_DAY) {
    this.resetData();
    if (!this.curConsignor || !this.dateStart || !this.dateEnd) return;

    const body = {
      id: this.curConsignor.consignor_id,
      start: this.dateStart.toISOString(),
      end: this.dateEnd.toISOString(),
    };
    this.table = this.query.getTransactionsTable(body);
    setTimeout(() => (this.tableIsAvailable = true), 0);
    // this.tableIsAvailable = true;

    // this.query.getTransactionsForChart(body).subscribe((chart) => {
    //   this.getChartData(chart, interval);
    //   // console.log(chart);
    //   this.chartIsAvailable = true;
    // });
  }

  // getChartData = (chart: TransactionRes[], interval: Interval) => {
  //   this.chartData = [];
  //   if (!this.dateEnd || !this.dateStart || !chart[0]) return;

  //   let iterChart = chart[Symbol.iterator]();
  //   let curItem = iterChart.next().value;

  //   loopDays(this.dateStart, this.dateEnd, (date: Date) => {
  //     let series: Series[] = [];
  //     const valid = () =>
  //       curItem && new Date(curItem.sale_timestamp).isSameDay(date);

  //     while (valid()) {
  //       series.push({ name: curItem.item, value: +curItem.total });
  //       curItem = iterChart.next().value;
  //     }
  //     this.chartData?.push({
  //       name: `${date.toLocaleDateString('en-za')}`,
  //       series: series,
  //     });
  //   });
  // };

  previewInvoice() {
    if (!this.curConsignor || !this.dateStart || !this.dateEnd) return;
    const body = {
      id: this.curConsignor.consignor_id,
      start: this.dateStart.toISOString(),
      end: this.dateEnd.toISOString(),
    };
    const name = this.curConsignor.name_surname;
    this.query.getTransactions(body).subscribe((transactions) => {
      this.invoiceData = { transactions: transactions, name: name };
      this.showInvoice = true;
    });
  }

  printInvoice() {
    this.invoice.downloadAsPDF();
  }
}
