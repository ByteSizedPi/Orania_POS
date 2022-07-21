import { Component, OnInit } from '@angular/core';
import { Total } from 'src/app/shared/models/types/Types';
import { QueryService } from 'src/app/shared/services/query.service';

@Component({
  selector: 'app-shop-stats',
  templateUrl: './shop-stats.component.html',
  styleUrls: ['./shop-stats.component.scss'],
})
export class ShopStatsComponent<Type extends Total> implements OnInit {
  currentTable: number = 0;

  constructor(public query: QueryService) {}

  setVal(value: number) {
    // Id('interval-table').style.opacity = '0';
    setTimeout(() => (this.currentTable = value), 500);
  }

  ngOnInit(): void {}
}
