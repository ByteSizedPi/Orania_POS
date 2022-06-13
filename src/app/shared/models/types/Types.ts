import { MatTableDataSource } from '@angular/material/table';

export enum TABLESTRING {
  TRANSACTION = 'transaction',
  CONSIGNOR = 'consignor',
}
interface BaseColumn<Field> {
  header: string;
  cell: (el: Field) => string;
  classes?: (el: Field) => string[];
}

export interface Column<Field> extends BaseColumn<Field> {
  columnDef: string;
}

export class Table<Type> {
  data: MatTableDataSource<Type>;
  compactDisplayFormat?: Column<Type>[];
  displayFormat: Column<Type>[];
  // public tableName: TABLESTRING,
  constructor(displayFormat: BaseColumn<Type>[], data: Type[]) {
    this.data = new MatTableDataSource(data);
    this.displayFormat = this.getKeys(displayFormat);
  }

  private getKeys = (displayFormat: BaseColumn<Type>[]) =>
    (this.displayFormat = displayFormat.map((el, i) => ({
      columnDef: Object.keys(el)[i],
      ...el,
    })));
}
