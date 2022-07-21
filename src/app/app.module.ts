import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './views/main/main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TransactionComponent } from './views/main/components/transaction/transaction.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { QueriesComponent } from './views/main/components/queries/queries.component';
import { MatCardModule } from '@angular/material/card';
import { ConsignorsComponent } from './views/main/components/consignors/consignors.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewConsignorComponent } from './views/main/components/consignors/new-consignor/new-consignor.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ConsignorReportComponent } from './views/main/components/consignors/consignor-report/consignor-report.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { InvoiceComponent } from './shared/components/invoice/invoice.component';
import { ShopStatsComponent } from './views/main/components/consignors/shop-stats/shop-stats.component';
import { TableComponent } from './shared/components/table/table.component';
import { LoginComponent } from './views/login/login.component';
import { DatePickerComponent } from './shared/components/date-picker/date-picker.component';
import { DatePickerHeaderComponent } from './shared/components/date-picker/date-picker-header/date-picker-header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TransactionComponent,
    QueriesComponent,
    ConsignorsComponent,
    NewConsignorComponent,
    ConsignorReportComponent,
    InvoiceComponent,
    ShopStatsComponent,
    TableComponent,
    LoginComponent,
    DatePickerComponent,
    DatePickerHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSidenavModule,
    FormsModule,
    MatDividerModule,
    MatMenuModule,
    NgxChartsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
