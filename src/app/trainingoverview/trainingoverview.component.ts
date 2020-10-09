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
  public loading: boolean = true;

  constructor(private api: ApiService, private statistics: StatisticsService) {}

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
