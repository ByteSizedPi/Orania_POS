import { NewConsignorService } from './shared/components/consignors/new-consignor/new-consignor.service';
import { TransactionEventService } from './shared/components/transaction/confirm-transaction/transaction-modal.service';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'kontreiwinkel';
	constructor(
		public transaction: TransactionEventService,
		public consignorModal: NewConsignorService
	) {}
}
