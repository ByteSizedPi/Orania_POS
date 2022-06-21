import { Table, Total } from './../../models/types/Types';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Id } from '../../models/types/Utils';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<Type extends Total> implements AfterViewInit {
  @Input() tableObservable: Observable<Table<Type>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('tableEl') tableEl: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  table: Table<Type>;
  dataLoaded: boolean = false;

  constructor() {}

  ngAfterViewInit(): void {
    this.tableEl.nativeElement.style.opacity = '0';
    this.tableObservable.subscribe((data) => {
      this.table = data;
      this.table.data.paginator = this.paginator;
      this.table.data.sort = this.sort;
      this.tableEl.nativeElement.style.opacity = '1';
      this.dataLoaded = true;
    });
  }

  getHeaders = () => this.table.displayFormat.map(({ columnDef }) => columnDef);

  getTotal = () =>
    this.table.data.data
      .map(({ total }) => +total)
      .reduce((acc, val) => +acc + val, 0);
}
