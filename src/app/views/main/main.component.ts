import { UserService } from './../../shared/services/user.service';
import { Component } from '@angular/core';
import { NewConsignorService } from './components/consignors/new-consignor/new-consignor.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  activeTab = 0;
  reportCategory = 0;
  constructor(public modal: NewConsignorService, public user: UserService) {}

  getColor = (index: number) => ({
    backgroundColor: this.activeTab === index ? 'var(--bg)' : 'var(--bg-light)',
  });

  getBG = (stat: boolean) => ({
    backgroundColor: stat ? 'var(--light)' : 'var(--bg-light)',
  });

  signOut = () => this.user.unsetUser();
}
