import { ClientService } from './../client.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-get-client',
  templateUrl: './get-client.component.html',
  styleUrls: ['./get-client.component.css']
})
export class GetClientComponent implements OnInit {

  @Input()  i : any;


  public listClient = [];

  constructor(private clientService: ClientService,private router: Router) { }

  ngOnInit(): void {
    // load list
    this.loadListClient();
  }

  // load client
  loadListClient() {
      // get all clients
      this.clientService.getAllClient().subscribe(data => {
        this.listClient = data;
    });
  }


  navigateToDetails(index){
    // naviation vers edit-client/id
    this.router.navigate(['main/client', this.listClient[index].id]);}


  deleteClient(index) {
    this.clientService.deleteClient(this.listClient[index].id).subscribe(() =>
     { console.log('Client deleted')
     this.listClient.splice(index,1);
    },(err)=>console.log(err));
   /* this.notifyDelete.emit(id);*/
}
}
