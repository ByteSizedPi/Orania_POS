import {
  Consignor,
  ConsignorTable,
  ID_Name,
} from './../models/types/Consignor';
import {
  Transaction,
  TransactionTable,
  Report,
  ReportTable,
  TransactionRes,
} from './../models/types/Transaction';
import { TransactionService } from './transaction.service';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type IDDate = {
  id: string;
  start: string;
  end: string;
};

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  BASE_URL = 'https://www.kontreiwinkelorania.co.za/assets/api/';
  ALT = 'https://www.kontreiwinkelorania.co.za/api/index.php/';

  constructor(
    private http: HttpClient,
    private transaction: TransactionService
  ) {}

  httpGet = <E>(params: string) => this.http.get<E>(this.ALT + params);
  httpPost = (params: string, body: any = {}) =>
    this.http.post(this.ALT + params, body);

  getAllConsignors = () => this.httpGet<Consignor[]>('consignor');

  getIDs = () => this.httpGet<string[]>('consignor/ids');

  getNames = () => this.httpGet<ID_Name[]>('consignor/names');

  getAllItems = () => this.httpGet<string[]>('transaction/items');

  getInvoice = () => this.httpGet<number>('transaction/invoice');

  updateInvoice = () => this.httpPost('transaction/invoice');
  // updateInvoice = () => this.http.put('transaction/invoice', {});

  getTransactions = ({ id, start, end }: IDDate) =>
    this.httpGet<Transaction[]>(
      `transaction/subset?id=${id}&start=${start}&end=${end}`
    );

  getConsignorsTable = () =>
    this.getAllConsignors().pipe(map((rows) => new ConsignorTable(rows)));

  getTransactionsTable = (idDate: IDDate) =>
    this.getTransactions(idDate).pipe(
      map((rows) => new TransactionTable(rows))
    );

  // getStats = (body: { start: string; end: string }) =>
  // 	this.http
  // 		.post<Report[]>(this.BASE_URL + 'transactions/byIdDate.php', body)
  // 		.pipe(map((rows) => new ReportTable(rows)));

  // getAllTransactionsTable = () =>
  //   this.http
  //     .get<Transaction[]>(this.BASE_URL + 'transactions/getAll.php')
  //     .pipe(map((rows) => new TransactionTable(rows)));

  // getTransactionsForChart = (body: {
  //   id: string;
  //   start: string;
  //   end: string;
  // }) =>
  //   this.http.post<TransactionRes[]>(
  //     this.BASE_URL + 'transactions/byGroup.php',
  //     body
  //   );

  postTransaction = () =>
    this.http.post(
      this.BASE_URL + 'transactions/post.php',
      this.transaction.getList()
    );

  postConsignor = (body: {
    consignor_id: string;
    name_surname: string;
    cell_nr: string;
  }) => this.http.post(this.BASE_URL + 'consignors/post.php', body);
}
