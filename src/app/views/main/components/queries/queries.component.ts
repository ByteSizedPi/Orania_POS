import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { QueryService } from 'src/app/shared/services/query.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss'],
})
export class QueriesComponent implements OnInit {
  table: any;
  // tbl = TABLESTRING;

  constructor(private query: QueryService) {}

  ngOnInit(): void {
    // this.setDataSource(TABLESTRING.TRANSACTION);
  }

  // setDataSource = (t: TABLESTRING) => {
  //   // if (t === TABLESTRING.CONSIGNOR) {
  //   // 	this.query
  //   // 		.getConsignorsTable()
  //   // 		.subscribe((table) => (this.table = table));
  //   // } else {
  //   // 	this.query
  //   // 		.getAllTransactionsTable()
  //   // 		.subscribe((table) => (this.table = table));
  //   // }
  // };
  getHeaders = () =>
    this.table.displayFormat.map(
      ({ columnDef }: { columnDef: any }) => columnDef
    );

  applyFilter = ({ target }: Event) =>
    (this.table.data.filter = (target as HTMLInputElement).value
      .trim()
      .toLowerCase());
}