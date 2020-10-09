import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-competition-overview',
  templateUrl: './competition-overview.component.html',
  styleUrls: ['./competition-overview.component.css'],
})
export class CompetitionOverviewComponent implements OnInit {
  public competitions = [];
  public loading: boolean = true;

  async getData() {
    try {
      this.loading = true;
      this.competitions = await this.api.getCompetitionSolves();
    } finally {
      this.loading = false;
    }
  }

  constructor(private api: ApiService, private statistics: StatisticsService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  formatDate(date) {
    return this.statistics.formatDate(date);
  }

  averageThree(solves) {
    return this.statistics.averageThree(solves.map((solve) => solve.time));
  }

  openAnalytics(id: string) {
    this.router.navigateByUrl(`/analysis/${id}`);
  }
}
