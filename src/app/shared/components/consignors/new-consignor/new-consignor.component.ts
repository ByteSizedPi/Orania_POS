import { QueryService } from './../../../services/query.service';
import { NewConsignorService } from './new-consignor.service';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

interface Erorr {
	minLength: { requiredLength: number; actualLength: number };
	existError: string;
}

@Component({
	selector: 'app-new-consignor',
	templateUrl: './new-consignor.component.html',
	styleUrls: ['./new-consignor.component.scss'],
})
export class NewConsignorComponent implements OnInit {
	code: FormControl;
	name: FormControl;
	cellNr: FormControl;

	constructor(
		public modal: NewConsignorService,
		private queryService: QueryService
	) {
		this.code = new FormControl('', Validators.required, this.codeExists);
		this.name = new FormControl('', Validators.required);
		this.cellNr = new FormControl();
	}

	codeExists = (control: AbstractControl) =>
		this.queryService
			.getIDs()
			.pipe(
				map((val) =>
					val.includes(control.value)
						? { existError: 'afsender bestaan klaar' }
						: null
				)
			);

	postConsignor = () =>
		this.queryService
			.postConsignor({
				consignor_id: this.code.value,
				name_surname: this.name.value,
				cell_nr: this.cellNr.value,
			})
			.subscribe((res) => {
				alert('nuwe afsender suksesvol bygevoeg!');
				this.modal.modalOut();
			});

	ngOnInit(): void {}
}
