import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public email: string = ''

  constructor(private sidebarService: NbSidebarService, menuService: NbMenuService, private authService: AngularFireAuth, router: Router) {
    menuService.onItemClick().subscribe(({item}) => {
      if (item.title === 'Logout') {
        this.authService.signOut().then(() => {
          localStorage.clear()
          router.navigateByUrl('login')
        })
      }
    })

    this.authService.user.subscribe(user => {
      this.email = user ? user.email : ''
    })
  }

  public menuItems: NbMenuItem[] = [
    {
      title: 'Fortschritt',
      icon: 'home-outline',
      link: '/',
    },
    {
      title: 'Training',
      icon: 'clock-outline',
      link: '/training',
    },
    {
      title: 'Training Übersicht',
      icon: 'bar-chart-outline',
      link: '/trainingoverview',
    },
    {
      title: 'Wettkampf',
      icon: 'cube-outline',
      link: '/competition',
    },
    {
      title: 'Wettkampf Übersicht',
      icon: 'award-outline',
      link: '/competitionoverview',
    },
    {
      title: 'Logout',
      icon: 'unlock-outline'
    },
  ];

  toggle() {
    this.sidebarService.toggle(false, 'right');
  }
}
