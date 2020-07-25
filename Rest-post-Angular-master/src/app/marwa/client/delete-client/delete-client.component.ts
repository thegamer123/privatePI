import { Client } from './../client.model';

import { Component, OnInit } from '@angular/core';
import {ClientService} from '../client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent implements OnInit {


  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    
  }


  deleteClient(id) {
    this.clientService.deleteClient(id).subscribe(() =>
      console.log('Client deleted'),(err)=>console.log(err));
   /* this.notifyDelete.emit(id);*/
}
}