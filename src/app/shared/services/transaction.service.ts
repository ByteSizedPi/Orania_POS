import { Item } from '../models/types/Transaction';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class TransactionService {
	private curList: Item[] = [];
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// 	{ amount: 6, item: 'koekies', seller_id: '002', unit_price: 6 },
	// ];

	completeTransaction: EventEmitter<boolean> = new EventEmitter();

	constructor() {}

	pushItem = (item: Item) => this.curList.push(item);

	popItem = (index: number) => this.curList.splice(index, 1);

	setList = (list: Item[]) => (this.curList = list);

	getList = () => this.curList;

	getTotal = () =>
		this.curList.reduce((acc, item) => acc + item.unit_price * item.amount, 0);
}
