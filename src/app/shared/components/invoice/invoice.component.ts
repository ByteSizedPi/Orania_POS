import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Transaction } from '../../models/types/Transaction';
import jsPDF from 'jspdf';
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
  name: string = 'Lee van Dyk';
  invoiceNr: string = '#42';
  @Input() data: Transaction[];
  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor() {}

  getTotal = () =>
    this.data.map(({ total }) => +total).reduce((acc, val) => +acc + val, 0);

  downloadAsPDF() {
    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download();
  }
}
