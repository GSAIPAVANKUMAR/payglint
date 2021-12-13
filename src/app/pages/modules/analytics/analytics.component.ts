import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    var approvedTransactionChart = new Chart(this.elementRef.nativeElement.querySelector(`#approvedTransactionChart`), {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: ['75', '20', '5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['22', '45', '67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['54', '76', '12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
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

    var approvedTransactionAmountChart = new Chart(this.elementRef.nativeElement.querySelector(`#approvedTransactionAmountChart`), {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: ['75', '20', '5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['22', '45', '67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['54', '76', '12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
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

    var transactionChart = new Chart(this.elementRef.nativeElement.querySelector(`#transactionChart`), {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: ['75', '20', '5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['22', '45', '67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['54', '76', '12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
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

    var highRiskTransactionChart = new Chart(this.elementRef.nativeElement.querySelector(`#highRiskTransactionChart`), {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: ['75', '20', '5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['22', '45', '67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['54', '76', '12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
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

    var highRiskTransactionTopUsersChart = new Chart(this.elementRef.nativeElement.querySelector(`#highRiskTransactionTopUsersChart`), {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: ['75', '20', '5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['22', '45', '67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['54', '76', '12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
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

    var approvedTransactionSameDayChart = new Chart(this.elementRef.nativeElement.querySelector(`#approvedTransactionSameDayChart`), {
      type: 'line',
      data: {
        labels: ['A', 'B', 'C'],
        datasets: [
          {
            data: ['75', '20', '5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['22', '45', '67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['54', '76', '12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
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
