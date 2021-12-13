import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  filtersArray: string[] = ["filter1", "filter2", "filter3"];
  checkpointsArray: string[] = ['checkpoint1', 'checkpoint2', 'checkpoint3'];
  statusArray: string[] = ['status1', 'status2', 'status3'];

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    var userChart = new Chart(this.elementRef.nativeElement.querySelector(`#userChart`), {
      type: 'bar',
      data: {
        labels: ['Register', 'Login', 'General', 'AddpaymentMethod', 'Transaction'],
        datasets: [{
          data: ['2200', '400', '2600', '1500', '3500'],
          backgroundColor: ['#6778AE', '#9D9EA8', '#7685B5', '#658C3D', '#4D556A'],
          barThickness: 40,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            grid: {
              display: true,
            },
            beginAtZero: true,
            max: 4000,
            min: 0,
            ticks: {
              maxTicksLimit: 9,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        }
      }
    });

    var transactionChart = new Chart(this.elementRef.nativeElement.querySelector(`#transactionChart`), {
      type: 'doughnut',
      data: {
        labels: ['Success', 'Warning', 'Failure'],
        datasets: [{
          data: ['75', '20', '5'],
          backgroundColor: ['#8DC63F', '#FF6464', '#E49115'],
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    var amountChart = new Chart(this.elementRef.nativeElement.querySelector(`#amountChart`), {
      type: 'doughnut',
      data: {
        labels: ['Success', 'Warning', 'Failure'],
        datasets: [{
          data: ['75', '20', '5'],
          backgroundColor: ['#8DC63F', '#FF6464', '#E49115'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
