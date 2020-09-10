import { Component, OnInit } from '@angular/core';
import { Competition } from "../competition";
import { Results } from "../results";

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public rounds: Results[] = [
    { round: 1, roundTime: "00:29.234", roundInstructions: "U R F' L2 R' B D' U2 F U' L' D R'" },
    { round: 2, roundTime: "00:32.645", roundInstructions: "U R F' L2 R' B D' U2 F U' L' D R'" },
    { round: 3, roundTime: "00:55.020", roundInstructions: "U R F' L2 R' B D' U2 F U' L' D R'" },
    { round: 4, roundTime: "00:45.432", roundInstructions: "U R F' L2 R' B D' U2 F U' L' D R'" },
    { round: 5, roundTime: "00:10.939", roundInstructions: "U R F' L2 R' B D' U2 F U' L' D R'" },
  ];
  public competition: Competition = { results: this.rounds, averageThree: "00:55.020", averageFive: "00:55.020", best: "00:10.939", worst: "00:55.020" }



}
