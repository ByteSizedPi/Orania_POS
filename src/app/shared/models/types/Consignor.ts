import { dateToString } from './Date';
import { Table, TABLESTRING } from './Types';

export interface Consignor {
  consignor_id: string;
  name_surname: string;
  registered_date: string;
  cell_nr: string;
}

export type ID_Name = {
  consignor_id: string;
  name_surname: string;
};

export class ConsignorTable extends Table<Consignor> {
  constructor(data: Consignor[]) {
    super(
      // TABLESTRING.CONSIGNOR,
      [
        {
          // columnDef: 'consignor_id',
          header: 'Afsender Kode',
          cell: (el: Consignor) => `${el.consignor_id}`,
        },
        {
          // columnDef: 'name_surname',
          header: 'Naam',
          cell: (el: Consignor) => `${el.name_surname}`,
        },
        {
          // columnDef: 'registered_date',
          header: 'Registrasie Datum',
          cell: (el: Consignor) => el.registered_date,
        },
        {
          // columnDef: 'cell_nr',
          header: 'Selfoon Nommer',
          cell: (el: Consignor) => `${el.cell_nr}`,
        },
      ],
      data
    );
  }
}
