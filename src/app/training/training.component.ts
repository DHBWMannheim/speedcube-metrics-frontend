import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  constructor() { }

  public timeBegan = null;
  public timeStopped: any = null;
  public stoppedDuration: any = 0;
  public started = null;
  public running = false;
  public blankTime = '00:00.000';
  public time = '00:00.000';
  public ms = 0;
  public timeElapsed: any = null;
  public result = [];


  generate_scramble = (): void => {
    const moves = [
      ['U', "U'", 'U2'],
      ['D', "D'", 'D2'],
      ['R', "R'", 'R2'],
      ['L', "L'", 'L2'],
      ['F', "F'", 'F2'],
      ['B', "B'", 'B2'],
    ];

    let scramble = '';
    let lastMoveType = null;

    for (let i = 0; i < 20; i++) {
      let moveType = Math.floor(Math.random() * 6);
      moveType = moveType === lastMoveType ? (moveType + 1) % 6 : moveType;
      const move = Math.floor(Math.random() * 3);
      scramble += ` ${moves[moveType][move]}`;
      lastMoveType = moveType;
    }

    this.scramble = scramble.trim();
  };

  ngOnInit(): void {
    this.generate_scramble();
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
  stop() {
    this.running = false;
    this.timeStopped = new Date();
    this.result.push({
      scamble: this.scramble,
      time: this.ms,
      date: new Date(),
      timeElapsed: this.timeElapsed,
    });
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
    let min = this.timeElapsed.getUTCMinutes();
    let sec = this.timeElapsed.getUTCSeconds();
    let ms = this.timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(min, 2) +
      ':' +
      this.zeroPrefix(sec, 2) +
      '.' +
      this.zeroPrefix(ms, 3);
    this.ms =
      this.timeElapsed.getUTCMilliseconds() +
      this.timeElapsed.getUTCSeconds() * 1000 +
      this.timeElapsed.getUTCMinutes() * 1000 * 60;
  }
}
