import { Item } from './../../models/types/Transaction';
import { QueryService } from 'src/app/shared/services/query.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FullTransaction } from '../../models/types/Transaction';
// import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  invoiceNr: number;
  @Input() data: {
    transactions: FullTransaction[] | Item[];
    name?: string;
  };
  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor(public query: QueryService) {
    this.query.getInvoice().subscribe((num) => (this.invoiceNr = num));
  }

  getTotal = () =>
    this.data.transactions
      .map(({ total }) => +total)
      .reduce((acc, val) => +acc + val, 0);

  downloadAsPDF() {
    this.query.updateInvoice().subscribe((res) => {
      const pdfTable = this.pdfTable.nativeElement;
      var html = htmlToPdfmake(pdfTable.innerHTML);
      const documentDefinition = { content: html };
      pdfMake.createPdf(documentDefinition).download();
    });
  }
}
