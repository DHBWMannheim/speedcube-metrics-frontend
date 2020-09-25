import { Component, OnInit } from '@angular/core';
import { Chart } from 'chartjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  chart = [];

  constructor() { }

  ngOnInit(): void {
  }
}
