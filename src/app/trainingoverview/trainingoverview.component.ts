import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainingoverview',
  templateUrl: './trainingoverview.component.html',
  styleUrls: ['./trainingoverview.component.css']
})
export class TrainingoverviewComponent implements OnInit {

  results = [
    ["25.09.20", "00:23.34", "00:24:98"],
    ["25.09.20", "00:23.34", "00:24:98"],
    ["25.09.20", "00:23.34", "00:24:98"],
    ["25.09.20", "00:23.34", "00:24:98"],
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
