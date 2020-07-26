import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import { Facture } from '../Facture';
import { FactureService } from '../facture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  email: string;

  constructor(private factureService: FactureService, private router: Router) { }

  ngOnInit() {
  }

  generatePdf(data) {

    var doc = new jspdf();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    const _data = doc.output();
    const blob = new Blob([_data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    /* var facture = new Facture();
      facture.name = Date.now() + '.pdf';
      facture.url = url;
      facture.data = _data;*/

    var facture = new FormData();
    facture.append('name', Date.now() + '.pdf');
    facture.append('url', url);
    facture.append('data', _data);


    this.factureService.addFacture(facture).subscribe(result => {
      console.log(result);
      console.log('success add');

    }, error => {

    });
  }

}
