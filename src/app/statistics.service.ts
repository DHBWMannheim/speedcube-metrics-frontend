import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  averageThree(times, format = true) {
    const min = Math.min(...times);
    const max = Math.max(...times);

    const time =
      times
        .filter((t: number) => t !== min && t !== max)
        .reduce((a, b) => a + b, 0) / 3;

    return format ? this.formatTime(time) : time;
  }

  averageFive(times, format = true) {
    const time = times.reduce((a, b) => a + b, 0) / 5;
    return format ? this.formatTime(time) : time;
  }

  best(times, format = true) {
    const time = Math.min(...times);
    return format ? this.formatTime(time) : time;
  }

  worst(times, format = true) {
    const time = Math.max(...times);
    return format ? this.formatTime(time) : time;
  }

  formatDate(date, time = true) {
    return format(date.toDate(), time ? 'dd.MM.yy kk:mm' : 'dd.MM.yy');
  }

  pad = (n: number) => (String(n) as any).padStart(2, '0').substring(0, 2);

  formatTime(ms: number) {
    let remainingTime: number = ms;

    let hours: number = 0;
    let minutes: number = 0;
    let seconds: number = 0;
    let milliseconds: number = 0;

    if (remainingTime / 3600000 >= 1) {
      hours = Math.floor(remainingTime / 3600000);
      remainingTime -= hours * 3600000;
    }

    if (remainingTime / 60000 >= 1) {
      minutes = Math.floor(remainingTime / 60000);
      remainingTime -= minutes * 60000;
    }

    if (remainingTime / 1000 >= 1) {
      seconds = Math.floor(remainingTime / 1000);
      remainingTime -= seconds * 1000;
    }

    milliseconds = Math.floor(remainingTime / 10);

    return `${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(
      milliseconds
    )}`;
  }

  generateScramble(): string {
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

    return scramble.trim();
  }
}
