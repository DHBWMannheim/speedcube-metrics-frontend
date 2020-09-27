import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition-overview',
  templateUrl: './competition-overview.component.html',
  styleUrls: ['./competition-overview.component.css']
})
export class CompetitionOverviewComponent implements OnInit {

  constructor() { 
    const results = [
      ["25.09.20", "00:23.34", "00:24:98"],
      ["25.09.20", "00:23.34", "00:24:98"],
      ["25.09.20", "00:23.34", "00:24:98"],
      ["25.09.20", "00:23.34", "00:24:98"],
    ]
    }

  ngOnInit(): void {
  }

}
