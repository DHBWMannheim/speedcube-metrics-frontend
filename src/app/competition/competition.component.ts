import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css'],
})
export class CompetitionComponent implements OnInit {
  public saving: boolean = false;

  constructor(private api: ApiService, private statistics: StatisticsService, private router: Router) {}

  generate_scramble(): void {
    this.scramble = this.statistics.generateScramble();
  }

  ngOnInit(): void {
    this.generate_scramble();
  }

  public timeBegan = null;
  public timeStopped: any = null;
  public stoppedDuration: any = 0;
  public started = null;
  public running = false;
  public blankTime = '00:00.00';
  public time = '00:00.00';
  public round = 1;
  public competition = true;
  public ms = 0;
  public timeElapsed: any = null;
  public result = [];
  public scramble = '';

  start() {
    if (this.running) return;
    this.reset();
    if (this.timeBegan === null) {
      this.reset();
      this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration: any = +new Date() - this.timeStopped;
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }
  stop() {
    this.running = false;
    this.timeStopped = new Date();
    if (this.round < 5) {
      this.result.push({
        scramble: this.scramble,
        time: this.ms,
        round: this.round,
        date: new Date(),
        timeElapsed: this.time,
      });
      this.round = this.round + 1;
      this.generate_scramble();
    } else {
      this.result.push({
        scramble: this.scramble,
        time: this.ms,
        round: this.round,
        date: new Date(),
        timeElapsed: this.time,
      });
      this.competition = false;
    }
    clearInterval(this.started);
  }
  reset() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  }
  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }
  clockRunning() {
    let currentTime: any = new Date();
    this.timeElapsed = new Date(
      currentTime - this.timeBegan - this.stoppedDuration
    );
    this.ms =
      this.timeElapsed.getUTCMilliseconds() +
      this.timeElapsed.getUTCSeconds() * 1000 +
      this.timeElapsed.getUTCMinutes() * 1000 * 60;
    this.time = this.statistics.formatTime(this.ms)
  }
  async saveCompetition() {
    try {
      this.saving = true;

      const id = await this.api.addCompetition({
        date: new Date(),
        solves: this.result,
      });
      this.router.navigateByUrl(`/analysis/${id}`)
    } finally {
      this.saving = false;
    }
  }
  resetCompetition() {
    this.reset();
    this.generate_scramble();
    this.round = 1;
    this.result = [];
    this.competition = true;
  }
}
