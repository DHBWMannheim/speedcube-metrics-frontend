import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: [],
})
export class TrainingComponent implements OnInit {

  constructor(private api: ApiService, private statistics: StatisticsService) {}

  public timeBegan = null;
  public timeStopped: any = null;
  public stoppedDuration: any = 0;
  public started = null;
  public running = false;
  public blankTime = '00:00.00';
  public time = '00:00.00';
  public ms = 0;
  public timeElapsed: any = null;
  public scramble = '';

  generate_scramble(): void {
    this.scramble = this.statistics.generateScramble();
  }

  ngOnInit(): void {
    this.generate_scramble()
  }

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
  async stop() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
    this.generate_scramble()
    await this.api.addTrainingSolve({
      scramble: this.scramble,
      time: this.ms,
      date: new Date(),
      timeElapsed: this.time,
    });
  }
  cancel() {
    this.running = false;
    this.reset();
    this.generate_scramble()
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
}
