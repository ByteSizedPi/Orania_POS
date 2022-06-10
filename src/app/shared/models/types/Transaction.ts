import { Table, TABLESTRING } from './Types';

export interface Transaction {
  item: string;
  amount: number;
  sale_timestamp: string;
  transaction_id: number;
  sequence: number;
  consignor_id: string;
  unit_price: number;
  total: number;
}

export interface TransactionRes {
  item: string;
  count: number;
  sale_timestamp: string;
  total: number;
}

export class TransactionTable extends Table<Transaction> {
  compactDisplayFormat = [
    {
      columnDef: 'item',
      header: 'Item',
      cell: (el: Transaction) => `${el.item}`,
    },
    {
      columnDef: 'sale_timestamp',
      header: 'Verkoop Tydstempel',
      cell: (el: Transaction) => el.sale_timestamp,
    },

    {
      columnDef: 'amount',
      header: 'Hoeveel',
      cell: (el: Transaction) => `${el.amount}`,
    },
    {
      columnDef: 'unit_price',
      header: 'Eenheid Prys',
      cell: (el: Transaction) => {
        var formatter = new Intl.NumberFormat('en-ZA', {
          style: 'currency',
          currency: 'ZAR',
        });
        return formatter.format(el.unit_price);
      },
      classes: (el: Transaction) => (el.unit_price > 0 ? ['green'] : ['red']),
    },
    {
      columnDef: 'total',
      header: 'Totaal',
      cell: (el: Transaction) => {
        var formatter = new Intl.NumberFormat('en-ZA', {
          style: 'currency',
          currency: 'ZAR',
        });
        return formatter.format(el.total);
      },
      classes: (el: Transaction) => (el.unit_price > 0 ? ['green'] : ['red']),
    },
  ];
  constructor(data: Transaction[]) {
    super(
      TABLESTRING.TRANSACTION,
      [
        {
          columnDef: 'transaction_id',
          header: 'Transaksie Indeks',
          cell: (el: Transaction) => `${el.transaction_id}`,
        },
        {
          columnDef: 'sequence',
          header: 'Transaksie Nommer',
          cell: (el: Transaction) => `${el.sequence}`,
        },
        {
          columnDef: 'seller_id',
          header: 'Verkoper Kode',
          cell: (el: Transaction) => `${el.consignor_id}`,
        },

        {
          columnDef: 'sale_timestamp',
          header: 'Verkoop Tydstempel',
          cell: (el: Transaction) => el.sale_timestamp,
        },
        {
          columnDef: 'item',
          header: 'Item',
          cell: (el: Transaction) => `${el.item}`,
        },
        {
          columnDef: 'amount',
          header: 'Hoeveel',
          cell: (el: Transaction) => `${el.amount}`,
        },
        {
          columnDef: 'unit_price',
          header: 'Eenheid Prys',
          cell: (el: Transaction) => {
            var formatter = new Intl.NumberFormat('en-ZA', {
              style: 'currency',
              currency: 'ZAR',
            });
            return formatter.format(el.unit_price);
          },
        },
        {
          columnDef: 'total',
          header: 'Totaal',
          cell: (el: Transaction) => {
            var formatter = new Intl.NumberFormat('en-ZA', {
              style: 'currency',
              currency: 'ZAR',
            });
            return formatter.format(el.total);
          },
        },
      ],
      data
    );
  }
}

export class ReportTable extends Table<Report> {
  constructor(data: Report[]) {
    super(
      TABLESTRING.TRANSACTION,
      [
        {
          columnDef: 'consignor_id',
          header: 'Afsender Kode',
          cell: (el: Report) => `${el.consignor_id}`,
        },
        {
          columnDef: 'name_surname',
          header: 'Naam',
          cell: (el: Report) => `${el.name_surname}`,
        },
        {
          columnDef: 'seller_id',
          header: 'Verkoper Kode',
          cell: (el: Report) => `${el.consignor_id}`,
        },

        {
          columnDef: 'date',
          header: 'Datum',
          cell: (el: Report) => el.date,
        },
        {
          columnDef: 'total',
          header: 'totaal',
          cell: (el: Report) => `${el.total}`,
        },
      ],
      data
    );
  }
}

export interface Item {
  item: string;
  amount: number;
  unit_price: number;
  consignor_id: string;
}

export interface Report {
  consignor_id: string;
  name_surname: string;
  date: string;
  total: number;
}
