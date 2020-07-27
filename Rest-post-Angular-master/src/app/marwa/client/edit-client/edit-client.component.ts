import { Client } from './../client.model';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  public id: number;
  address: string;
  social_reason: string;
  general_manager: string;
  email: string;
  phone: string;
  errors = [];

  constructor(private router: Router, private route: ActivatedRoute, private clientService: ClientService) {
    this.id = this.route.snapshot.params['id'];

  }
  public client;

  ngOnInit() {
    this.loadClient();
  }
  // load list client
  loadClient() {

    console.log(this.id)
    // get all clients
    this.clientService.getClientById(this.id).subscribe(data => {
      console.log(data);
      this.client = data;
      this.address = this.client.address;
      this.social_reason = this.client.social_reason;
      this.general_manager = this.client.general_manager;
      this.email = this.client.email;
      this.phone = this.client.phone;
    });
  }
  editClient(address, social_reason, general_manager, email, phone) {
    var client = new Client();
    client.address = address;
    client.social_reason = social_reason;
    client.general_manager = general_manager;
    client.email = email;
    client.phone = phone;
    console.table(client);


    /*console.table(post);*/
    this.clientService.updateClient(client, this.id).subscribe(result => {
      console.log(result);
      this.router.navigate(['main/clients']);
    }, error => {
      console.log(error);
      this.router.navigate(['main/clients']);
    });


  }
}
