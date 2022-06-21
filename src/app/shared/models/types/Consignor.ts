import { dateToString } from './Date';
import { Table } from './Types';

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

// export class ConsignorTable extends Table<Consignor> {
//   constructor(data: Consignor[]) {
//     super(
//       [
//         ['Afsender Kode', 'consignor_id'],
//         ['Naam', 'name_surname'],
//         ['Registrasie Datum', 'registered_date'],
//         ['Selfoon Nommer', 'cell_nr'],
//       ],
//       data
//     );
//   }
// }
