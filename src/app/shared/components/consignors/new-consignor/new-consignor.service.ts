import { Injectable } from '@angular/core';
import { Id } from 'src/app/shared/models/types/Utils';

@Injectable({
	providedIn: 'root',
})
export class NewConsignorService {
	show: boolean = false;
	constructor() {}

	modalIn = () => {
		this.show = true;
		setTimeout(() => {
			Id('new-consignor-backdrop').style.pointerEvents = 'all';
			Id('new-consignor-backdrop').style.animation = 'fade-in 0.5s forwards';
			Id('new-consignor-modal').style.animation = 'modal-in 0.5s forwards';
		}, 0);
	};

	modalOut = () => {
		Id('new-consignor-backdrop').style.pointerEvents = 'none';
		Id('new-consignor-backdrop').style.animation = 'fade-out 0.5s forwards';
		Id('new-consignor-modal').style.animation = 'modal-out 0.5s forwards';
		setTimeout(() => (this.show = false), 600);
	};
}
