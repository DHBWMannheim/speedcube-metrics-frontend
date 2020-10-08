import { Component } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private sidebarService: NbSidebarService) {}

  public menuItems: NbMenuItem[] = [
    {
      title: 'Fortschritt',
      icon: 'home-outline',
      link: '/main',
    },
    {
      title: 'Training',
      icon: 'clock-outline',
      link: '/main/training',
    },
    {
      title: 'Training Übersicht',
      icon: 'bar-chart-outline',
      link: '/main/trainingoverview',
    },
    {
      title: 'Wettkampf',
      icon: 'cube-outline',
      link: '/main/competition',
    },
    {
      title: 'Wettkampf Übersicht',
      icon: 'award-outline',
      link: '/main/competitionoverview',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
    },
  ];

  toggle() {
    this.sidebarService.toggle(false, 'right');
  }
}
