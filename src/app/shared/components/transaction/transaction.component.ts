import { TransactionService } from '../../services/transaction.service';
import { TransactionEventService } from './confirm-transaction/transaction-modal.service';
import { QueryService } from './../../services/query.service';
import { query, queryAll, Id } from '../../models/types/Utils';
import {
	AfterContentInit,
	AfterViewInit,
	Component,
	OnInit,
} from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
	concatMap,
	filter,
	map,
	startWith,
	switchMap,
	mergeMap,
} from 'rxjs/operators';
import {
	MatAutocompleteActivatedEvent,
	MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { Item } from '../../models/types/Transaction';

@Component({
	selector: 'app-transaction',
	templateUrl: './transaction.component.html',
	styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit, AfterViewInit {
	codeControl = new FormControl('', Validators.required);
	itemControl = new FormControl('', Validators.required);
	amountControl = new FormControl('', Validators.required);
	priceControl = new FormControl('', Validators.required);
	list: Item[] = [];

	codeOptions: Observable<string[]>;
	itemOptions: Observable<string[]>;

	filteredCodes: Observable<string[]>;
	filteredItems: Observable<string[]>;

	inputArr: {
		element?: HTMLInputElement;
		value: string;
		tempValue: string;
	}[] = [0, 0, 0, 0, 0].map((input) => ({
		value: '',
		tempValue: '',
	}));

	displayedColumns = ['number', 'code', 'item', 'amount', 'price', 'total'];

	constructor(
		private queryService: QueryService,
		private modal: TransactionEventService,
		public transaction: TransactionService
	) {
		this.itemOptions = this.queryService.getAllItems();
		this.codeOptions = this.queryService.getIDs();

		// this.queryService.getCodes().subscribe((res) => {
		// let codeValidator = (control: AbstractControl) =>
		// 	this.codeOptions.includes(control.value)
		// 		? null
		// 		: { err: 'afsender bestaan nie' };

		// this.codeControl = new FormControl(null, codeValidator);

		const filterValues = (array: string[], value: string) =>
			array.filter((str) =>
				str.toLowerCase().includes((value || '').toLowerCase())
			);

		this.filteredCodes = this.codeControl.valueChanges.pipe(
			switchMap((value) =>
				this.codeOptions.pipe(map((options) => filterValues(options, value)))
			)
		);

		this.filteredItems = this.itemControl.valueChanges.pipe(
			switchMap((value) =>
				this.itemOptions.pipe(map((options) => filterValues(options, value)))
			)
		);
	}

	ngAfterViewInit(): void {
		setTimeout(this.resetInputs.bind(this), 0);
	}

	ngOnInit(): void {}

	resetInputs() {
		this.inputArr = this.displayedColumns.slice(1, 5).map((input) => ({
			element: <HTMLInputElement>Id(`${input}-input`),
			value: '',
			tempValue: '',
		}));

		this.itemControl.reset();
		this.codeControl.reset();
		this.amountControl.reset();
		this.priceControl.reset();
	}

	onClose(index: number) {
		if (this.inputArr[index].tempValue)
			this.inputArr[index].value = this.inputArr[index].tempValue;
		this.inputArr[index].tempValue = '';
	}

	isValidTransaction = () =>
		this.codeControl.invalid ||
		this.itemControl.invalid ||
		this.amountControl.invalid ||
		this.priceControl.invalid;

	addItem(trigger: MatAutocompleteTrigger): void {
		const [consignor_id, item, amount, unit_price] = this.inputArr.map(
			({ value }) => value
		);
		this.transaction.pushItem({
			consignor_id: consignor_id,
			item: item,
			amount: +amount,
			unit_price: +unit_price,
		});
		this.resetInputs();
		this.list = [...this.transaction.getList()];
		this.tabTo(0, trigger);
	}

	popItem(index: number) {
		this.transaction.popItem(index);
		this.list = [...this.transaction.getList()];
	}

	tabTo = (index: number, trigger?: MatAutocompleteTrigger) => {
		this.inputArr[index].element?.click();
		setTimeout(() => trigger?.openPanel(), 0);
	};

	completeTransaction() {
		this.modal.modalIn();
		this.transaction.completeTransaction.subscribe((val) => {
			this.transaction.setList((this.list = []));
			alert('transaksie suksesvol!');
		});
	}
}
