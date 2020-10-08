import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-trainingoverview',
  templateUrl: './trainingoverview.component.html',
  styleUrls: ['./trainingoverview.component.css'],
})
export class TrainingoverviewComponent implements OnInit {
  public solves = [];
  public api: ApiService;
  public statistics: StatisticsService;
  public loading: boolean = true;

  constructor(api: ApiService, statistics: StatisticsService) {
    this.api = api;
    this.statistics = statistics;
  }

  async getData() {
    try {
      this.loading = true;
      this.solves = await this.api.getTrainingSolves();
    } finally {
      this.loading = false;
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  formatDate(date) {
    return this.statistics.formatDate(date);
  }
}
