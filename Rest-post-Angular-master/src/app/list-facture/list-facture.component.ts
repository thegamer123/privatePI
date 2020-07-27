import { Component, OnInit } from '@angular/core';
import { Facture } from '../Facture';
import { FactureService } from '../facture.service';
import { FactureClient } from '../factureClient';

@Component({
  selector: 'app-list-facture',
  templateUrl: './list-facture.component.html',
  styleUrls: ['./list-facture.component.css']
})
export class ListFactureComponent implements OnInit {

  listFacture: FactureClient[];
  constructor(private factureService: FactureService) { }

  ngOnInit() {
    this.loadPage();
  }


  // load page
  loadPage() {
    this.loadListFacture();
  }

  // load list
  loadListFacture() {
    // get all category projects
    this.factureService.getFacture().subscribe(data => {
      console.log(data);
      this.listFacture = data;
    });
  }


  deleteFacture(index) {
    this.factureService.deleteFacture(this.listFacture[index].id).subscribe(() => {
      console.log('Facture deleted');
      this.listFacture.splice(index, 1);
    }, (err) => console.log(err));
    /* this.notifyDelete.emit(id);*/
  }

  openUrlInNewTab(index) {
    window.open(this.listFacture[index].url, '_blank');
  }

}
