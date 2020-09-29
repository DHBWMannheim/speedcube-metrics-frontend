import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isloggedIn : boolean;
  constructor(public authService: AngularFireAuth) {
    this.isloggedIn = false;
  }

  async login() {
    try{
    var mail = (<HTMLInputElement>document.getElementById(mail)).value;
    var password = (<HTMLInputElement>document.getElementById(password)).value;
    await this.authService.signInWithEmailAndPassword(mail, password);
    console.log("Login erfolgreich!");
    this.isloggedIn = true;
    }catch(e){
      console.log(e)
    }
  }
  async loginWithGoogle(){
    try{
    await this.authService.signInWithPopup(new auth.GoogleAuthProvider());
    console.log("Login erfolgreich!");
    this.isloggedIn = true;
    }catch(e){
      console.log(e)
    }
    
  }
  async loginWithGitHub(){
    try{
    await this.authService.signInWithPopup(new auth.GithubAuthProvider());
    console.log("Login erfolgreich!");
    this.isloggedIn = true;
    }catch(e){
      console.log(e)
    }
  }
  ngOnInit(): void {}
}
