import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-background',
  templateUrl: './main-background.component.html',
  styleUrls: ['./main-background.component.css']
})
export class MainBackgroundComponent implements OnInit {
  items = [
    { title: 'Overview' },
    { title: 'Training' },
    { title: 'Competition' },
  ];

  constructor() { }

  changetitle (){
    document.getElementById('title').textContent = "";
  }

  ngOnInit() {
  }


}
