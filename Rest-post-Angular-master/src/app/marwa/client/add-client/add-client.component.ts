import { Client } from './../client.model';
import { ClientService } from './../client.service';
import { FormGroup, FormControl, FormsModule, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  address: string;
  social_reason: string;
  general_manager: string;
  email: string;
  phone: string;
  errors = [];
  ClientForm: FormGroup;
  constructor(private clientService: ClientService, private router: Router) {

    this.ClientForm = new FormGroup({
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, , Validators.pattern('^[a-zA-Z0-9_.+-]+@+.[a-zA-Z0-9]+$')]),
      general_manager: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
      social_reason: new FormControl('', [Validators.required, Validators.minLength(3)]),

    });
  }


  ngOnInit(): void {
    // load list
  }

  get Address() {
    return this.ClientForm.get('address');
  }
  get Social_reason() {
    return this.ClientForm.get('social_reasonress');
  }
  get General_manager() {
    return this.ClientForm.get('general_manager');
  }
  get Email() {
    return this.ClientForm.get('email');
  }
  get Phone() {
    return this.ClientForm.get('phone');
  }
  addClient(address, social_reason, general_manager, email, phone) {
    var client = new Client();
    client.address = address;
    client.social_reason = social_reason;
    client.general_manager = general_manager;
    client.email = email;
    client.phone = phone;
    console.log(client);
    this.clientService.addClient(client).subscribe(result => {
      console.log(result);
      this.router.navigate(['/main/clients']);
    }, error => {
      console.log(error);
      this.router.navigate(['/main/clients']);
    });

  }


}
