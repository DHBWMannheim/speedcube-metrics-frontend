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

  async login(username, password) {
    await this.authService.signInWithEmailAndPassword(username, password);
  }
  async loginWithGoogle(){
    await this.authService.signInWithPopup(new auth.GoogleAuthProvider());
  }
  async loginWithGitHub(){
    await this.authService.signInWithPopup(new auth.GithubAuthProvider());
  }

  async register() {
    //await this.authService.createUserWithEmailAndPassword('', '');
  }

  ngOnInit(): void {}
}
