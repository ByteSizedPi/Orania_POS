import { Component } from '@angular/core';
import { NewConsignorService } from './views/main/components/consignors/new-consignor/new-consignor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'kontreiwinkel';
  constructor(public consignorModal: NewConsignorService) {}
}
