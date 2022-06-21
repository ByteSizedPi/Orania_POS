import { Table, total, unitPrice } from './Types';

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

export class TransactionTable extends Table<FullTransaction> {
  constructor(data: FullTransaction[]) {
    super(
      [
        ['Item', 'item'],
        ['Verkoop Tydstempel', 'sale_timestamp'],
        ['Aantal', 'amount'],
        unitPrice<FullTransaction>(),
        total<FullTransaction>(),
      ],
      data
    );
  }
}

export interface ByDay {
  date: number;
  day: string;
  total: number;
}

export class ByDayTable extends Table<ByDay> {
  constructor(data: ByDay[]) {
    super([['datum', 'date'], ['Dag', 'day'], total<ByDay>()], data);
  }
}

export interface ByWeek {
  week: number;
  week_start: string;
  total: number;
}

export class ByWeekTable extends Table<ByWeek> {
  constructor(data: ByWeek[]) {
    super(
      [['Week', 'week'], ['Week Begin', 'week_start'], total<ByWeek>()],
      data
    );
  }
}

export interface ByMonth {
  month: number;
  month_name: string;
  total: number;
}

export class ByMonthTable extends Table<ByMonth> {
  constructor(data: ByMonth[]) {
    super(
      [['Maand Nr', 'month'], ['Maand', 'month_name'], total<ByMonth>()],
      data
    );
  }
}

export interface ByYear {
  year: number;
  total: number;
}

export class ByYearTable extends Table<ByYear> {
  constructor(data: ByYear[]) {
    super([['Jaar', 'year'], total<ByYear>()], data);
  }
}

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

// export class ReportTable extends Table<Report> {
//   constructor(data: Report[]) {
//     super(
//       // TABLESTRING.TRANSACTION,
//       [
//         {
//           // columnDef: 'consignor_id',
//           header: 'Afsender Kode',
//           format: (el: Report) => `${el.consignor_id}`,
//         },
//         {
//           // columnDef: 'name_surname',
//           header: 'Naam',
//           format: (el: Report) => `${el.name_surname}`,
//         },
//         {
//           // columnDef: 'date',
//           header: 'Datum',
//           format: (el: Report) => el.date,
//         },
//         {
//           // columnDef: 'total',
//           header: 'totaal',
//           format: (el: Report) => `${el.total}`,
//         },
//       ],
//       data
//     );
//   }
// }
