import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { InvoiceComponent } from 'src/app/shared/components/invoice/invoice.component';
import { ID_Name, Consignor } from 'src/app/shared/models/types/Consignor';
import { TransactionTable } from 'src/app/shared/models/types/Transaction';
import { Invoice } from 'src/app/shared/models/types/Types';
import { QueryService } from 'src/app/shared/services/query.service';
import { NewConsignorService } from '../new-consignor/new-consignor.service';

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
  invoiceData: Invoice;

  @ViewChild(InvoiceComponent) invoice: InvoiceComponent;
  dateStart: Date | undefined;
  dateEnd: Date | undefined;
  curDateFunction: () => void = this.setDay;
  dateShortcut: string = 'Dag';

  constructor(public query: QueryService, public modal: NewConsignorService) {
    this.allConsignors = this.query.getNames();
    this.setDay();
  }

  setDate(
    name: string,
    curFunc: () => void,
    endf: (end: Date) => Date,
    start?: Date
  ): void {
    this.curDateFunction = curFunc;
    if (start) this.dateStart = start;
    if (!this.dateStart) this.dateStart = new Date().dayBegin();
    this.dateEnd = endf(this.dateStart);
    this.dateShortcut = name;
    this.getData();
  }

  setDay() {
    this.setDate('Dag', this.setDay, (date) => date.addDays(1));
  }

  setWeek() {
    this.setDate('Week', this.setWeek, (date) => date.addDays(6));
  }

  setMonth() {
    this.setDate(
      'Maand',
      this.setMonth,
      (endDate) => endDate.monthBegin().addMonths(1).addDays(-1),
      this.dateStart?.monthBegin()
    );
  }

  setYear() {
    this.setDate(
      'Jaar',
      this.setYear,
      (date) => date.yearBegin().addYears(1).addDays(-1),
      this.dateStart?.yearBegin()
    );
  }

  setStart(date: Date) {
    this.dateStart = date;
    this.curDateFunction();
    this.getData();
  }

  setEnd(date: Date) {
    if (!date) return;
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
    this.table = this.query.getTransactionsByIDDateTable(body);
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
    this.query.getTransactionsByIDDate(body).subscribe((transactions) => {
      this.invoiceData = { transactions: transactions, name: name };
      this.showInvoice = true;
    });
  }
}
