import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import { Facture } from '../Facture';
import { FactureService } from '../facture.service';
import { Router } from '@angular/router';
import { ClientService } from '../marwa/client/client.service';
import { Client } from '../marwa/client/client.model';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {

  email: string;

  constructor(private factureService: FactureService, private router: Router, private clientService: ClientService) { }

  ngOnInit() {

    this.loadListClient();
  }
  clientSelectedPosition = 0;
  client: Client[];

  loadListClient() {
    // get all clients
    this.clientService.getAllClient().subscribe(data => {
      this.client = data;
      console.log(data);
    });

  }

  generatePdf(data) {

    var doc = new jspdf();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    const _data = doc.output('blob');
    const blob = new Blob([_data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    var type = 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2)
    var formdata = new FormData();
    formdata.append('my_file',_data);

    var facture = new Facture();
    facture.data = _data;

    this.factureService.uploadFacture(formdata).subscribe(result => {

      facture.url = result.toString();
      this.factureService.addFacture(facture, this.client[this.clientSelectedPosition].id).subscribe(result => {
        console.log(result);
        console.log('success add');

      }, error => {

      });
    }, error => {

    });


  }
  onChange(index) {
    this.clientSelectedPosition = index;
  }



}
