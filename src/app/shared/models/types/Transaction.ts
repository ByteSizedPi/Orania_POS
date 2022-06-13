import { toCurrency } from './Utils';
import { Table, Column } from './Types';

interface BaseTransaction {
  item: string;
  amount: number;
  unit_price: number;
  total: number;
}

export interface FullTransaction extends BaseTransaction {
  consignor_id: string;
  sale_timestamp: string;
}

// export interface TransactionRes {
//   item: string;
//   count: number;
//   sale_timestamp: string;
//   total: number;
// }

export interface Item extends BaseTransaction {
  consignor_id: string;
  sale_timestamp?: string;
}

export interface Report {
  consignor_id: string;
  name_surname: string;
  date: string;
  total: number;
}

export class NewTransactionTable extends Table<Item> {
  constructor(data: FullTransaction[]) {
    super(
      [
        {
          header: 'Kode',
          cell: (el) => `${el.consignor_id}`,
        },
        {
          header: 'Item',
          cell: (el) => `${el.item}`,
        },
        {
          header: 'Aantal',
          cell: (el) => `${el.amount}`,
        },
        {
          header: 'Eenheid Prys',
          cell: (el) => toCurrency(el.unit_price),
        },
        {
          header: 'Totaal',
          cell: (el) => toCurrency(el.total),
        },
      ],
      data
    );
  }
}

export class TransactionTable extends Table<FullTransaction> {
  compactDisplayFormat: Column<FullTransaction>[] = [
    {
      columnDef: 'item',
      header: 'Item',
      cell: (el) => `${el.item}`,
    },
    {
      columnDef: 'sale_timestamp',
      header: 'Verkoop Tydstempel',
      cell: (el) => el.sale_timestamp,
    },

    {
      columnDef: 'amount',
      header: 'Aantal',
      cell: (el) => `${el.amount}`,
    },
    {
      columnDef: 'unit_price',
      header: 'Eenheid Prys',
      cell: (el) => {
        var formatter = new Intl.NumberFormat('en-ZA', {
          style: 'currency',
          currency: 'ZAR',
        });
        return formatter.format(el.unit_price);
      },
      classes: (el) => (el.unit_price > 0 ? ['green'] : ['red']),
    },
    {
      columnDef: 'total',
      header: 'Totaal',
      cell: (el) => {
        var formatter = new Intl.NumberFormat('en-ZA', {
          style: 'currency',
          currency: 'ZAR',
        });
        return formatter.format(el.total);
      },
      classes: (el) => (el.unit_price > 0 ? ['green'] : ['red']),
    },
  ];
  constructor(data: FullTransaction[]) {
    super(
      // TABLESTRING.TRANSACTION,
      [
        {
          // columnDef: 'seller_id',
          header: 'Verkoper Kode',
          cell: (el: FullTransaction) => `${el.consignor_id}`,
        },

        {
          // columnDef: 'sale_timestamp',
          header: 'Verkoop Tydstempel',
          cell: (el: FullTransaction) => el.sale_timestamp,
        },
        {
          // columnDef: 'item',
          header: 'Item',
          cell: (el: FullTransaction) => `${el.item}`,
        },
        {
          // columnDef: 'amount',
          header: 'Aantal',
          cell: (el: FullTransaction) => `${el.amount}`,
        },
        {
          // columnDef: 'unit_price',
          header: 'Eenheid Prys',
          cell: (el: FullTransaction) => {
            var formatter = new Intl.NumberFormat('en-ZA', {
              style: 'currency',
              currency: 'ZAR',
            });
            return formatter.format(el.unit_price);
          },
        },
        {
          // columnDef: 'total',
          header: 'Totaal',
          cell: (el: FullTransaction) => {
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
      // TABLESTRING.TRANSACTION,
      [
        {
          // columnDef: 'consignor_id',
          header: 'Afsender Kode',
          cell: (el: Report) => `${el.consignor_id}`,
        },
        {
          // columnDef: 'name_surname',
          header: 'Naam',
          cell: (el: Report) => `${el.name_surname}`,
        },
        {
          // columnDef: 'date',
          header: 'Datum',
          cell: (el: Report) => el.date,
        },
        {
          // columnDef: 'total',
          header: 'totaal',
          cell: (el: Report) => `${el.total}`,
        },
      ],
      data
    );
  }
}
