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
    var mail = (<HTMLInputElement>document.getElementById(mail)).value;
    var password = (<HTMLInputElement>document.getElementById(password)).value;
    // TODO try catch blog
    await this.authService.signInWithEmailAndPassword(mail, password);
    console.log("Login erfolgreich!")
  }
  async loginWithGoogle(){
    await this.authService.signInWithPopup(new auth.GoogleAuthProvider());
  }
  async loginWithGitHub(){
    await this.authService.signInWithPopup(new auth.GithubAuthProvider());
  }
  ngOnInit(): void {}
}
