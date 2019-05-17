import { Injectable } from '@angular/core';
import { ChartModel } from '../models/chart-model';
import { DashBoardModel } from '../models/dashboard-model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  public loadDashBoard(): ChartModel[] {
    return [
      {
        title:'title',
        subtitle:'subtitle',
        chartSize: 'col-md-6',
        lock: false,
        chartType: 'line',
        chartTypes:[
          {'icon': 'show_chart', 'label': 'Line', 'val': 'line'},
          {'icon': 'bar_chart', 'label': 'Bar', 'val': 'bar'}
        ],
        datasets: [
          { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
          { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
          { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
        ],
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        options: {
          responsive: true,
          scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
              {
                id: 'y-axis-0',
                position: 'left',
              },
              {
                id: 'y-axis-1',
                position: 'right',
                gridLines: {
                  color: 'rgba(255,0,0,0.3)',
                },
                ticks: {
                  fontColor: 'red',
                }
              }
            ]
          },
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: 'March',
                borderColor: 'orange',
                borderWidth: 2,
                label: {
                  enabled: true,
                  fontColor: 'orange',
                  content: 'LineAnno'
                }
              },
            ],
          },
        },
        colors: [
          { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
          { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          }
        ],
        legend: true,
      }, 
      {
        title:'title',
        subtitle:'subtitle',
        chartSize: 'col-md-6',
        lock: false,
        chartType: 'line',
        chartTypes:[
          {'icon': 'show_chart', 'label': 'Line', 'val': 'line'},
          {'icon': 'bar_chart', 'label': 'Bar', 'val': 'bar'}
        ],
        datasets: [
          { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
          { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
          { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
        ],
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        options: {
          responsive: true,
          scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
              {
                id: 'y-axis-0',
                position: 'left',
              },
              {
                id: 'y-axis-1',
                position: 'right',
                gridLines: {
                  color: 'rgba(255,0,0,0.3)',
                },
                ticks: {
                  fontColor: 'red',
                }
              }
            ]
          },
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: 'March',
                borderColor: 'orange',
                borderWidth: 2,
                label: {
                  enabled: true,
                  fontColor: 'orange',
                  content: 'LineAnno'
                }
              },
            ],
          },
        },
        colors: [
          { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
          { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          }
        ],
        legend: true,
      },

      {
        title:'title',
        subtitle:'subtitle',
        chartSize: 'col-md-6',
        lock: false,
        chartType: 'line',
        chartTypes:[
          {'icon': 'show_chart', 'label': 'Line', 'val': 'line'},
          {'icon': 'bar_chart', 'label': 'Bar', 'val': 'bar'}
        ],
        datasets: [
          { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
          { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
          { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
        ],
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        options: {
          responsive: true,
          scales: {
            // We use this empty structure as a placeholder for dynamic theming.
            xAxes: [{}],
            yAxes: [
              {
                id: 'y-axis-0',
                position: 'left',
              },
              {
                id: 'y-axis-1',
                position: 'right',
                gridLines: {
                  color: 'rgba(255,0,0,0.3)',
                },
                ticks: {
                  fontColor: 'red',
                }
              }
            ]
          },
          annotation: {
            annotations: [
              {
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: 'March',
                borderColor: 'orange',
                borderWidth: 2,
                label: {
                  enabled: true,
                  fontColor: 'orange',
                  content: 'LineAnno'
                }
              },
            ],
          },
        },
        colors: [
          { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          },
          { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
          },
          { // red
            backgroundColor: 'rgba(255,0,0,0.3)',
            borderColor: 'red',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
          }
        ],
        legend: true,
      }
    ];
  }

  public loadDashboardsList(): DashBoardModel[]{
    return [
      {id: 1, name: 'dashboard1'},
      {id: 2, name: 'dashboard2'},
      {id: 3, name: 'dashboard3'},
      {id: 4, name: 'dashboard4'}
    ];
  }
}