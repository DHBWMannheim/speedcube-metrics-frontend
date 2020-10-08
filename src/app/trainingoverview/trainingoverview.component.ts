import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-trainingoverview',
  templateUrl: './trainingoverview.component.html',
  styleUrls: ['./trainingoverview.component.css'],
})
export class TrainingoverviewComponent implements OnInit {
  public solves = [];
  public api: ApiService;
  public loading: boolean = true;

  constructor(api: ApiService) {
    this.api = api;
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
    return format(date.toDate(), 'dd.MM.yy kk:mm');
  }
}
