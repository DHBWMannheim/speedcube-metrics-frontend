import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Results } from '../results';
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

  async ngOnInit(): Promise<void> {
    this.getData();
  }

  formatDate(date) {
    return format(date.toDate(), 'dd.MM.yy kk:mm');
  }

  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  public results = [
    {
      scamble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 21236,
      round: 1,
      date: new Date(),
      timeElapsed: '00:21.234',
    },
    {
      scamble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 39236,
      round: 2,
      date: new Date(),
      timeElapsed: '00:39.234',
    },
    {
      scamble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 25236,
      round: 3,
      date: new Date(),
      timeElapsed: '00:25.234',
    },
    {
      scamble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 30236,
      round: 4,
      date: new Date(),
      timeElapsed: '00:30.234',
    },
    {
      scamble: "U R F' L2 R' B D' U2 F U' L' D R'",
      time: 29236,
      round: 5,
      date: new Date(),
      timeElapsed: '00:29.234',
    },
  ];

  public resultRounds: Results[] = [
    {
      round: this.results[0].round,
      roundTime: this.results[0].timeElapsed,
      roundInstructions: this.results[0].scamble,
    },
    {
      round: this.results[1].round,
      roundTime: this.results[1].timeElapsed,
      roundInstructions: this.results[1].scamble,
    },
    {
      round: this.results[2].round,
      roundTime: this.results[2].timeElapsed,
      roundInstructions: this.results[2].scamble,
    },
    {
      round: this.results[3].round,
      roundTime: this.results[3].timeElapsed,
      roundInstructions: this.results[3].scamble,
    },
    {
      round: this.results[4].round,
      roundTime: this.results[4].timeElapsed,
      roundInstructions: this.results[4].scamble,
    },
  ];

  public averageThree = this.calcAverageThree();
  public averageFive = this.calcAverageFive();
  public best = this.calcBest();
  public worst = this.calcWorst();
  public date = this.getDate();

  private calcAverageThree(): string {
    let helpArray: number[] = [];
    let helpIndex: number = 0;
    let helpSum: number = 0;
    this.results.forEach((element) => {
      helpArray[helpIndex] = element.time;
      helpIndex++;
    });
    helpIndex = 0;
    helpArray.sort();
    helpArray.splice(0, 1);
    helpArray.splice(3, 1);
    helpArray.forEach((element) => {
      helpSum = helpSum + element;
    });
    helpSum = helpSum / 3;
    let timeString = this.timeFormatting(helpSum);
    return timeString;
  }

  private calcAverageFive(): string {
    let helpSum: number = 0;

    this.results.forEach((element) => {
      helpSum = helpSum + element.time;
    });
    helpSum = helpSum / 5;
    let timeString = this.timeFormatting(helpSum);
    return timeString;
  }

  private calcBest(): string {
    let helpArray: number[] = [];
    let helpIndex: number = 0;
    this.results.forEach((element) => {
      helpArray[helpIndex] = element.time;
      helpIndex++;
    });
    helpIndex = 0;
    helpArray.sort();
    helpArray.splice(1, 4);
    let timeString = this.timeFormatting(helpArray[0]);
    return timeString;
  }

  private calcWorst(): string {
    let helpArray: number[] = [];
    let helpIndex: number = 0;
    this.results.forEach((element) => {
      helpArray[helpIndex] = element.time;
      helpIndex++;
    });
    helpIndex = 0;
    helpArray.sort();
    helpArray.reverse();
    helpArray.splice(1, 4);
    console.log(helpArray[0]);
    let timeString = this.timeFormatting(helpArray[0]);
    return timeString;
  }
  private getDate(): Date {
    return new Date();
  }

  private timeFormatting(ms): string {
    let minutes = ms / 1000 / 60;
    minutes = Math.trunc(minutes);
    ms = ms - minutes * 1000 * 60;
    let seconds = ms / 1000;
    seconds = Math.trunc(seconds);
    ms = ms - seconds * 1000;

    let minutesString = '';
    minutesString = this.zeroPrefix(minutes, 2);

    let secondsString = '';
    secondsString = this.zeroPrefix(seconds, 2);

    let millisString = '';
    millisString = this.zeroPrefix(ms, 3);

    let timeString: string =
      minutesString + ':' + secondsString + '.' + millisString;
    return timeString;
  }
}
