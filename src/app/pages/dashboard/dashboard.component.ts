import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    var highRiskCheckPointChart = new Chart(this.elementRef.nativeElement.querySelector(`#highRiskCheckPointChart`), {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            data: ['55', '117', '234', '33', '111', '34', '234', '34', '109', '43', '243', '99'],
            borderColor: '#6778AE',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: 0.3,
          },
          {
            data: ['77', '178', '267', '22', '145', '23', '209', '54', '154', '56', '234', '123'],
            borderColor: '#F2A628',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: 0.3,
          },
          {
            data: ['33', '123', '289', '11', '132', '45', '298', '12', '132', '89', '123', '321'],
            borderColor: '#658C3D',
            borderWidth: 2,
            pointStyle: 'circle',
            fill: false,
            tension: 0.3,
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
            display: true,
            position: 'bottom',
            align: 'start',
            labels: {
              boxHeight: 16,
              boxWidth: 16,
            }
          },
        },
        scales: {
          x: {
            grid: {
              display: true,
            },
            display: true,
          },
          y: {
            beginAtZero: true,
            min: 0,
            max: 400,
            ticks: {
              color: '#7D8488',
              maxTicksLimit: 9,
              count: 9,
            },
          },
        },
      },
    });

    var riskTransactionsBySeverityChart = new Chart(this.elementRef.nativeElement.querySelector(`#riskTransactionsBySeverityChart`), {
      type: 'doughnut',
      data: {
        labels: ['Medium', 'High'],
        datasets: [{
          data: ['55', '45'],
          backgroundColor: ['#FFA217', '#FF6464'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'left',
          },
        },
      },
    });
  }
}
