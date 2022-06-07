import { QueryService } from '../../../services/query.service';
import { prePad, postPad } from '../../../models/types/Utils';
import { TransactionService } from '../../../services/transaction.service';
import { Item } from '../../../models/types/Transaction';
import { TransactionEventService } from './transaction-modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-confirm-transaction',
	templateUrl: './confirm-transaction.component.html',
	styleUrls: ['./confirm-transaction.component.scss'],
})
export class ConfirmTransactionComponent implements OnInit {
	displayedColumns = ['number', 'code', 'item', 'amount', 'price', 'total'];

	constructor(
		public transaction: TransactionService,
		public modal: TransactionEventService,
		public query: QueryService
	) {}

	ngOnInit(): void {}

	list = () => [...this.transaction.getList()];

	printInvoice() {
		var formatter = new Intl.NumberFormat('en-ZA', {
			style: 'currency',
			currency: 'ZAR',
		});

		let invoice = `No. |\tItem                 |\tHoeveelheid  |\tPrys   \t   | Totaal\n__________________________________________________________________________\n`;

		this.list().forEach(({ amount, item, unit_price }, i) => {
			invoice +=
				prePad(`${i + 1}`, 3) +
				'|\t' +
				postPad(item, 20) +
				'|\t' +
				postPad(`${amount}`, 11) +
				'|\t' +
				postPad(formatter.format(unit_price), 9) +
				'|\t' +
				postPad(formatter.format(amount * unit_price), 10) +
				'\n';
		});

		invoice +=
			'__________________________________________________________________________\n' +
			'Totaal:\t\t\t\t\t\t\t\t\t\t\t\t\t\t' +
			formatter.format(this.transaction.getTotal());

		console.log(invoice);
	}

	complete() {
		this.query.postTransaction().subscribe((_) => {
			this.modal.modalOut();
			this.transaction.completeTransaction.emit(true);
		});
	}

	cancel() {
		this.modal.modalOut();
		// this.transaction.completeTransaction.emit(false);
	}
}
