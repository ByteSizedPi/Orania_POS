import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { InvoiceComponent } from 'src/app/shared/components/invoice/invoice.component';
import { Item } from 'src/app/shared/models/types/Transaction';
import { Invoice } from 'src/app/shared/models/types/Types';
import { Id } from 'src/app/shared/models/types/Utils';
import { QueryService } from 'src/app/shared/services/query.service';
import { TransactionService } from 'src/app/shared/services/transaction.service';

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

  codeOptions: string[];
  itemOptions: string[];
  amountOptions: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

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

  @ViewChild(InvoiceComponent) invoice: InvoiceComponent;
  invoiceData: Invoice;

  showInvoice: boolean = false;
  displayedColumns = ['number', 'code', 'item', 'amount', 'price', 'total'];

  constructor(
    private queryService: QueryService,
    public transaction: TransactionService
  ) {
    const filterValues = (array: string[], value: string) =>
      array.filter((str) =>
        str.toLowerCase().includes((value || '').toLowerCase())
      );

    this.queryService.getIDs().subscribe((ids) => {
      this.codeOptions = ids;
      const codeExists = (control: AbstractControl): ValidationErrors | null =>
        ids.find((val) => control.value === val)
          ? null
          : { error: 'afsender bestaan nie' };

      this.codeControl = new FormControl('', [Validators.required, codeExists]);
      this.filteredCodes = this.codeControl.valueChanges.pipe(
        startWith(''),
        // map((value) => filterValues(ids, value))
        map((value) => ids)
      );
    });

    this.queryService.getAllItems().subscribe((ids) => {
      this.itemOptions = ids;
      this.filteredItems = this.itemControl.valueChanges.pipe(
        startWith(''),
        // map((value) => filterValues(ids, value))
        map((value) => ids)
      );
    });

    // this.codeOptions = this.queryService.getIDs();

    // this.queryService.getCodes().subscribe((res) => {
    // let codeValidator = (control: AbstractControl) =>
    // 	this.codeOptions.includes(control.value)
    // 		? null
    // 		: { err: 'afsender bestaan nie' };

    // this.codeControl = new FormControl(null, codeValidator);

    // this.filteredCodes = this.codeControl.valueChanges.pipe(
    //   switchMap((value) =>
    //     this.codeOptions.pipe(map((options) => filterValues(options, value)))
    //   )
    // );

    // this.filteredItems = this.itemControl.valueChanges.pipe(
    //   switchMap((value) =>
    //     this.itemOptions.pipe(map((options) => filterValues(options, value)))
    //   )
    // );
  }

  clearThenTabTo(index: number, trigger?: MatAutocompleteTrigger) {
    this.inputArr[index].value = '';
    this.tabTo(index, trigger);
    // setTimeout(() => this.tabTo(index, trigger), 0);
  }

  optionSelected(
    index: number,
    value: string,
    trigger?: MatAutocompleteTrigger
  ) {
    this.inputArr[index].tempValue = this.inputArr[index].value = value;
    this.tabTo(index + 1, trigger);
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
      total: +amount * +unit_price,
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

  previewInvoice() {
    this.invoiceData = { transactions: this.list, details: true };
    this.showInvoice = true;
  }

  complete() {
    this.queryService.postTransaction().subscribe((_) => {
      this.transaction.setList((this.list = []));
      this.showInvoice = false;
      alert('transaksie suksesvol!');
    });
  }
}
