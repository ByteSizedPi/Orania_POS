import { Injectable } from '@angular/core';
import { Id } from 'src/app/shared/models/types/Utils';

@Injectable({
	providedIn: 'root',
})
export class TransactionEventService {
	show: boolean = false;
	constructor() {}

	modalIn = () => {
		this.show = true;
		setTimeout(() => {
			Id('confirm-transaction-backdrop').style.pointerEvents = 'all';
			Id('confirm-transaction-backdrop').style.animation =
				'fade-in 0.5s forwards';
			Id('confirm-transaction').style.animation = 'modal-in 0.5s forwards';
		}, 0);
	};

	modalOut = () => {
		Id('confirm-transaction-backdrop').style.pointerEvents = 'none';
		Id('confirm-transaction-backdrop').style.animation =
			'fade-out 0.5s forwards';
		Id('confirm-transaction').style.animation = 'modal-out 0.5s forwards';
		setTimeout(() => (this.show = false), 600);
	};
}
