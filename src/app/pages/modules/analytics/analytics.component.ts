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

  Options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: false,
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 1,
        ticks: {
          maxTicksLimit: 11,
          count: 11,
        },
      },
    },
  };

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    var approvedTransactionChart = new Chart(this.elementRef.nativeElement.querySelector(`#approvedTransactionChart`), {
      type: 'line',
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            label: "f(x) = x",
            data: ['.34', '.56', '.89'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
            fill: false,
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
      },
      options: this.Options,
    });

    var approvedTransactionAmountChart = new Chart(this.elementRef.nativeElement.querySelector(`#approvedTransactionAmountChart`), {
      type: 'line',
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            data: ['.75', '.20', '.5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
      },
      options: this.Options,
    });

    var transactionChart = new Chart(this.elementRef.nativeElement.querySelector(`#transactionChart`), {
      type: 'line',
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            data: ['.75', '.20', '.5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
      },
      options: this.Options,
    });

    var highRiskTransactionChart = new Chart(this.elementRef.nativeElement.querySelector(`#highRiskTransactionChart`), {
      type: 'line',
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            data: ['.75', '.20', '.5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
      },
      options: this.Options,
    });

    var highRiskTransactionTopUsersChart = new Chart(this.elementRef.nativeElement.querySelector(`#highRiskTransactionTopUsersChart`), {
      type: 'line',
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            data: ['.75', '.20', '.5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
      },
      options: this.Options,
    });

    var approvedTransactionSameDayChart = new Chart(this.elementRef.nativeElement.querySelector(`#approvedTransactionSameDayChart`), {
      type: 'line',
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            data: ['.75', '.20', '.5'],
            borderColor: '#FF6464',
            pointStyle: 'cross',
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            pointStyle: 'cross',
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            pointStyle: 'cross',
          }
        ],
      },
      // options: this.Options,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            display: false,
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 1,
            ticks: {
              maxTicksLimit: 11,
              count: 11,
            },
          },
        },
      },
    });
  }
}
