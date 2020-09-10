import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AngularFireAuth) {}

  async login() {
    //await this.authService.signInWithEmailAndPassword('', '');
    await this.authService.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async register() {
    await this.authService.createUserWithEmailAndPassword('', '');
  }

  ngOnInit(): void {}
}
