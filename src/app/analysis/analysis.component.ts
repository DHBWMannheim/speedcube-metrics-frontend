import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ApiService } from '../api.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {
  public api: ApiService;
  public statistics: StatisticsService;
  public router: ActivatedRoute;
  public competition: any = {};
  public loading: boolean = true;

  public lineChartData: ChartDataSets[] = [{ data: [] }];
  public averageThree: string | number = '00:00.00';
  public averageFive: string | number = '00:00.00';
  public best: string | number = '00:00.00';
  public worst: string | number = '00:00.00';
  public solves: any[];
  public date: string;

  constructor(
    api: ApiService,
    statistics: StatisticsService,
    router: ActivatedRoute
  ) {
    this.api = api;
    this.router = router;
    this.statistics = statistics;
  }

  async getData() {
    this.loading = true;
    this.router.params.subscribe(async (params) => {
      this.competition = await this.api.getCompetitionById(params['id']);
      this.loading = false;

      this.lineChartData = [
        {
          data: this.competition.solves.map((solve) => solve.time / 1000),
        },
      ];

      this.solves = this.competition.solves;
      const solves = this.competition.solves.map((solve) => solve.time);

      this.averageThree = this.statistics.averageThree(solves);
      this.averageFive = this.statistics.averageFive(solves);
      this.best = this.statistics.best(solves);
      this.worst = this.statistics.worst(solves);
      this.date = this.statistics.formatDate(this.competition.date);
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  public lineChartLabels: Label[] = ['1', '2', '3', '4', '5'];
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
