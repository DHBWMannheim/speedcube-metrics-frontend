import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ApiService } from '../api.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  public loading: boolean = true;

  public trainingChartData: ChartDataSets[] = []
  public trainingLabels: Label[] = []

  public competitionChartData: ChartDataSets[] = []
  public competitionLabels: Label[] = []

  async getData() {
    this.loading = true
    
    const trainingData = await this.api.getTrainingSolves()
    const competitionData = await this.api.getCompetitionSolves()

    this.trainingChartData = [{data: trainingData.map(solve => solve.time / 1000) }]
    this.trainingLabels = trainingData.map(solve => this.statistics.formatDate(solve.date, false))

    this.competitionChartData = [{data: competitionData.map(competition => this.statistics.averageThree(competition.solves.map(solve => solve.time), false) as number)}]
    this.competitionLabels = competitionData.map((competition: any) => this.statistics.formatDate(competition.date, false))

    this.loading = false
  }

  constructor(private api: ApiService, private statistics: StatisticsService) {}

  ngOnInit(): void {
    this.getData()
  }

  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#0095ff',
      backgroundColor: 'rgba(0, 149, 255, 0.1)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
}
