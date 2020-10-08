import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Results } from '../results';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  chart = [];

  constructor() {}

  ngOnInit(): void {}
  public results = [
    {
      scramble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 40000,
      round: 1,
      date: new Date(),
      timeElapsed: '00:21.234',
    },
    {
      scramble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 39236,
      round: 2,
      date: new Date(),
      timeElapsed: '00:39.234',
    },
    {
      scramble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 27362,
      round: 3,
      date: new Date(),
      timeElapsed: '00:25.234',
    },
    {
      scramble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 30236,
      round: 4,
      date: new Date(),
      timeElapsed: '00:30.234',
    },
    {
      scramble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 23000,
      round: 5,
      date: new Date(),
      timeElapsed: '00:29.234',
    },
  ];

  public resultRounds: Results[] = [
    {
      round: this.results[0].round,
      roundTime: this.results[0].timeElapsed,
      roundInstructions: this.results[0].scramble,
    },
    {
      round: this.results[1].round,
      roundTime: this.results[1].timeElapsed,
      roundInstructions: this.results[1].scramble,
    },
    {
      round: this.results[2].round,
      roundTime: this.results[2].timeElapsed,
      roundInstructions: this.results[2].scramble,
    },
    {
      round: this.results[3].round,
      roundTime: this.results[3].timeElapsed,
      roundInstructions: this.results[3].scramble,
    },
    {
      round: this.results[4].round,
      roundTime: this.results[4].timeElapsed,
      roundInstructions: this.results[4].scramble,
    },
  ];
  public lineChartData: ChartDataSets[] = [
    {
      data: [
        this.results[0].time / 1000,
        this.results[1].time / 1000,
        this.results[2].time / 1000,
        this.results[3].time / 1000,
        this.results[4].time / 1000,
      ],
    },
  ];
  public lineChartLabels: Label[] = ['', '', '', '', ''];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(34,126,232)',
      backgroundColor: '',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
}
