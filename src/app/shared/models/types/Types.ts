import { Transaction } from './Transaction';
import { Consignor } from './Consignor';
import { MatTableDataSource } from '@angular/material/table';

export enum TABLESTRING {
	TRANSACTION = 'transaction',
	CONSIGNOR = 'consignor',
}

export interface Column<Field> {
	columnDef: string;
	header: string;
	cell: (el: Field) => string;
}

export type Data = Consignor | Transaction;
export type TableData = Table<Consignor> | Table<Transaction>;

export class Table<Type> {
	data: MatTableDataSource<Type>;
	compactDisplayFormat: Column<Type>[];
	constructor(
		public tableName: TABLESTRING,
		public displayFormat: Column<Type>[],
		data: Type[]
	) {
		this.data = new MatTableDataSource(data);
	}
}
