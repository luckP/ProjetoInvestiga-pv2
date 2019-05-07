import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public data;
  // public $load: Observable<Course[]>;

  constructor(private _dashboardService: DashboardService) { }

  ngOnInit() {
    this.loadAllEventsData();
    // this.load = false;
    this.setData();

  }

  load:boolean = true;
  
  loadAllEventsData():void{
    console.log('loadAllEventsData')
     this._dashboardService.loadAllEventsData()
      .subscribe(
        res => {
          console.log(res);
          // this.data = res;
          this.load = false;
        },
        err => {
          console.log(err);
          this.load = false;
        }
      )
  }

  public setData():any{
    this.data = {
      chartCards: [
        {
          title: 'In',
          pieChartLabels: ['Download Sales', 'In-Store Sales'],
          pieChartData: [[250, 1000]],
          percent: 25,
          pieChartType: 'pie',
          backgroundColor: [
            {
              backgroundColor: [
                'rgba(255, 255, 255, 0.3)',
                'rgba(0, 0, 0, 0.3)',
              ]
            }
          ],
          cardColor: '#10ac84'
        },
        {
          title: 'Out',
          pieChartLabels: ['Download Sales', 'In-Store Sales'],
          pieChartData: [[350, 1000]],
          percent: 35,
          pieChartType: 'pie',
          backgroundColor: [
            {
              backgroundColor: [
                'rgba(255, 255, 255, 0.3)',
                'rgba(0, 0, 0, 0.3)',
              ]
            }
          ],
          cardColor: '#ff9f43'
        },
        {
          title: 'Out Error',
          pieChartLabels: ['Download Sales', 'In-Store Sales'],
          pieChartData: [[150, 1000]],
          percent: 15,
          pieChartType: 'pie',
          backgroundColor: [
            {
              backgroundColor: [
                'rgba(255, 255, 255, 0.3)',
                'rgba(0, 0, 0, 0.3)',
              ]
            }
          ],
          cardColor: '#ee5253'
        },
      ],

      //BAR
      bar:{
        chartTypes: ['bar', 'line'],
        chartType: 'line',
        legend: true,
        options: {
            responsive: true,
            line: {
              tension: .1
            },
            // We use these empty structures as placeholders for dynamic theming.
            scales: { xAxes: [{}], yAxes: [{}] },
            plugins: {
              datalabels: {
                anchor: 'end',
                align: 'end',
              }
            }
          },
        labels: ['Spring', 'Summer', 'Autumn', 'Winter'],
        datasets: [
            { data: [123, 59, 44, 93], label: 'recolha' },
            { data: [15, 89, 34, 10], label: 'rejeitado' },
            { data: [34, 55, 12, 45], label: 'stop' },
            { data: [67, 91, 34, 75], label: 'busy' },
            { data: [12, 45, 80, 45], label: 'free' },
            { data: [12, 34, 87, 45], label: 'pause' }
          ],
        colors: [
          { // recolha rgb(85, 238, 196)
            backgroundColor: 'rgba(85, 238, 196, 0.6)',
            borderColor: 'rgb(85, 238, 196)',
            pointBackgroundColor: 'rgb(85, 238, 196)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // rejeitado rgb(129, 236, 236)
            backgroundColor: 'rgba(129, 236, 236, 0.6)',
            borderColor: 'rgb(129, 236, 236)',
            pointBackgroundColor: 'rgb(129, 236, 236)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
          { // stop rgb(116, 185, 255, 0)
            backgroundColor: 'rgba(116, 185, 255, 0.6)',
            borderColor: 'rgba(116, 185, 255, 1)',
            pointBackgroundColor: 'rgba(116, 185, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // busy rgb(162, 155, 254)
            backgroundColor: 'rgba(162, 155, 254, 0.6)',
            borderColor: 'rgba(162, 155, 254, 1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // free rgb(253, 122, 167)
            backgroundColor: 'rgba(253, 122, 167, 0.6)',
            borderColor: 'rgba(253, 122, 167, 1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
          { // pause rgb(253, 203, 110)
            backgroundColor: 'rgba(253, 203, 110, 0.6)',
            borderColor: 'rgba(253, 203, 110, 1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          }
        ],

      },

      // LINE
      line: {
        chartTypes: [],
        datasets: [
          { data: [51.25,59.71,5.7,6.89,83.86,10.2,20.56,65.72,51.23,18.62,40.47,57.23], label: 'recolha' },
          { data: [84.29,98,73.05,18.66,37.66,57.42,41.9,80.35,52.14,82.23,86.28,23.22,], label: 'rejeitado' },
          { data: [89.91,26.13,36.28,89.25,16.23,64.14,72.35,14.65,47.26,59.27,70.97,19.29,], label: 'stop' },
          { data: [81.78, 55.28, 73.46, 14.04, 1.81, 1.59, 12.13, 62.38, 82.85, 65.39, 82.85, 8.08,], label: 'busy' },
          { data: [65.41, 61.73, 76.73, 50.53, 46.72, 77.54, 34.67, 4.75, 44.39, 76.49, 90.09, 56.92 ], label: 'free' },
          { data: [94.31, 16.7, 96.07, 10.96, 49.91, 10.71, 71.35, 32.68, 37.93, 64.57, 38.06, 71.92], label: 'pause' }
        ],
        legend: true,
        chartType: 'line',
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        options: {
          responsive: true,
          elements: {
            line: {
                tension: .1
            }
        },
        },
        colors: [
          { // recolha rgb(85, 238, 196)
            backgroundColor: 'rgba(85, 238, 196, 0.2)',
            borderColor: 'rgb(85, 238, 196)',
            pointBackgroundColor: 'rgb(85, 238, 196)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // rejeitado rgb(129, 236, 236)
            backgroundColor: 'rgba(129, 236, 236, 0.2)',
            borderColor: 'rgb(129, 236, 236)',
            pointBackgroundColor: 'rgb(129, 236, 236)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
          { // stop rgb(116, 185, 255, 0)
            backgroundColor: 'rgba(116, 185, 255, 0.2)',
            borderColor: 'rgba(116, 185, 255, 1)',
            pointBackgroundColor: 'rgba(116, 185, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // busy rgb(162, 155, 254)
            backgroundColor: 'rgba(162, 155, 254, 0.2)',
            borderColor: 'rgba(162, 155, 254, 1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // free rgb(253, 122, 167)
            backgroundColor: 'rgba(253, 122, 167, 0.2)',
            borderColor: 'rgba(253, 122, 167, 1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
          { // pause rgb(253, 203, 110)
            backgroundColor: 'rgba(253, 203, 110, 0.2)',
            borderColor: 'rgba(253, 203, 110, 1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
        ],
      },

      // PIE
      pie:{
        chartTypes: ['pie', 'doughnut'],
        chartType: 'pie',
        
        legend: true,
        options: {
          responsive: true,
          legend: {
            position: 'top',
          },
          plugins: {
            datalabels: {
              formatter: (value, ctx) => {
                const label = ctx.chart.data.labels[ctx.dataIndex];
                return label;
              },
            },
          }
        },
        labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
        datasets: [3000, 500, 100],
        colors:[
          {
            backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
          },
        ],
      },

      // RADAR
      radar: {
        radarChartOptions: {
          responsive: true,
        },
        radarChartLabels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        radarChartData: [
          { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
          { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
        ],
        radarChartType: 'radar',
        constructor() { }
      },








    };




  }

}
