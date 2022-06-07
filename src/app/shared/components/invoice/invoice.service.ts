import { Transaction } from './../../models/types/Transaction';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class InvoiceService {
	transactions: Transaction[];
	constructor() {}

	set data(transactions: Transaction[]) {
		this.transactions = transactions;
	}
	get data() {
		return this.transactions;
	}
}
