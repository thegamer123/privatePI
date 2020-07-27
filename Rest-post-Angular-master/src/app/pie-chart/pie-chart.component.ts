import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../marwa/projet/projet.service';
import { ActiveResut } from '../marwa/activeResult';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  chartType = 'pie';
  validProjects = 0;
  inValidProjects = 0;
  public active;
  constructor(private _postService: ProjetService) {

  }

  chartDatasets: Array<any> = [
    { data: [0, 0], label: 'Project state' }
  ];

  chartLabels: Array<any> = ['Invalid', 'Valid'];

  chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  chartOptions: any = {
    responsive: true
  };
  ngOnInit() {

    this._postService.getProjectStatus().subscribe(data => {
      console.log(data);
      this.active = data;
      this.validProjects = this.active.projetsValidCount;
      this.inValidProjects = this.active.projetsNotValidCount;
      this.chartDatasets = [
        {
          data: [this.inValidProjects,
          this.validProjects], label: 'Project state'
        }
      ];
    });

  }




  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
