import { MatTableDataSource } from '@angular/material/table';
import { toCurrency } from './Utils';

export type Total = { total: number };

//Column header and formatter
export interface Column<Type> {
  columnDef: string;
  header: string;
  format: (el: Type) => string;
  classes?: (el: Type) => string[];
}

type ColumnArray<Type> =
  | [string, keyof Type]
  | [string, keyof Type, (val: any) => string]
  | [string, keyof Type, (val: any) => string, (el: Type) => string[]];

//table class with column formatter and data
export class Table<Type extends Total> {
  data: MatTableDataSource<Type>;
  displayFormat: Column<Type>[];

  constructor(displayFormat: ColumnArray<Type>[], data: Type[]) {
    this.displayFormat = this.toColumn(displayFormat);
    this.data = new MatTableDataSource(data);
  }

  private toColumn(displayFormat: ColumnArray<Type>[]) {
    return displayFormat.map(([header, property, format, classes]) =>
      GenericColumn<Type>(header, property, format, classes)
    );
  }
}

//utility function for creating a generic column
export const GenericColumn = <Type>(
  header: string,
  property: keyof Type,
  format?: (val: any) => string,
  classes?: (el: Type) => string[]
): Column<Type> => ({
  header: header,
  columnDef: property.toString(),
  format: (el: Type) => (format ? format(el[property]) : `${el[property]}`),
  classes: classes ?? undefined,
});

const colorNums = (val: number) => (val > 0 ? ['green'] : ['red']);

//specific frequently utilized columns
export const total = <Type extends Total>(): ColumnArray<Type> => [
  'Totaal',
  'total',
  toCurrency,
  ({ total }: Total) => colorNums(total),
];

export const unitPrice = <
  Type extends { unit_price: number }
>(): ColumnArray<Type> => [
  'Eenheid Prys',
  'unit_price',
  toCurrency,
  ({ unit_price }: { unit_price: number }) => colorNums(unit_price),
];
