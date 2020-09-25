import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {

  private starttime: number = null;
  private uiTimerId: number = null;

  constructor() {
  }

  ngOnInit(): void {
  }
  public timeBegan = null
  public timeStopped: any = null
  public stoppedDuration: any = 0
  public started = null
  public running = false
  public blankTime = "00:00.000"
  public time = "00:00.000"
  public round = 1;
  public competition = true;
  public instruction = "U R F' L2 R' B D' U2 F U' L' D R'"
  public ms = 0
  public timeElapsed: any = null;
  public result = []


  start() {
    if (this.running) return;
    this.reset();
    if (this.timeBegan === null) {
      this.reset();
      this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration: any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }
  stop() {
    this.running = false;
    this.timeStopped = new Date();
    if (this.round < 5) {
      this.round = this.round + 1;
    } else {
      this.competition = false;
    }
    this.result.push(
      {
        scamble: this.instruction,
        time: this.ms,
        round: this.round,
        date: new Date(),
        timeElapsed: this.timeElapsed
      })
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
    let currentTime: any = new Date()
    this.timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration)
    let min = this.timeElapsed.getUTCMinutes()
    let sec = this.timeElapsed.getUTCSeconds()
    let ms = this.timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2) + "." +
      this.zeroPrefix(ms, 3);
    this.ms = this.timeElapsed.getUTCMilliseconds() + this.timeElapsed.getUTCSeconds() * 1000 + this.timeElapsed.getUTCMinutes() * 1000 * 60;
  };
}
