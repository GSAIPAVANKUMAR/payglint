import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {

  graphLineTension: number = 0.3;

  Options = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
          drawTicks: false,
        },
        display: false,
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 1,
        ticks: {
          color: '#4D556A',
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
            data: ['.34', '.56', '.89'],
            borderColor: '#FF6464',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          }
        ],
      },
      // options: this.Options,
      options: {
        responsive: true,
        elements: {
          point: {
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
              drawTicks: false,
            },
            display: false,
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 1,
            ticks: {
              color: '#4D556A',
              maxTicksLimit: 11,
              count: 11,
            },
          },
        },
      },
    });

    var approvedTransactionAmountChart = new Chart(this.elementRef.nativeElement.querySelector(`#approvedTransactionAmountChart`), {
      type: 'line',
      data: {
        labels: ['1', '2', '3'],
        datasets: [
          {
            data: ['.75', '.20', '.5'],
            borderColor: '#FF6464',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
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
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
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
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
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
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
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
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.22', '.45', '.67'],
            borderColor: '#FFA217',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          },
          {
            data: ['.54', '.76', '.12'],
            borderColor: '#8DC63F',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: this.graphLineTension,
          }
        ],
      },
      options: this.Options,
    });
  }
}
