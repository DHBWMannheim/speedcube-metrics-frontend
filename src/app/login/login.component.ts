import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loggingIn: boolean = false;
  public showPassword = false;

  public email: string = '';
  public password: string  = ''

  constructor(public authService: AngularFireAuth, public router: Router) {}

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async login() {
    try{
      this.loggingIn = true;
      const { user }: auth.UserCredential = await this.authService.signInWithEmailAndPassword(this.email, this.password);

      localStorage.setItem('rubiks-uid', user.uid)
      this.router.navigateByUrl('/')
    } finally {
      this.loggingIn = false;
    }
  }

  async loginWithGoogle(){
    try {
      await this.authService.signInWithPopup(new auth.GoogleAuthProvider());
      console.log("Login erfolgreich!");
    } catch(e) {
      console.log(e)
    }
  }

  async loginWithGitHub(){
    try {
      await this.authService.signInWithPopup(new auth.GithubAuthProvider());
      console.log("Login erfolgreich!");
    } catch(e) {
      console.log(e)
    }
  }

  ngOnInit(): void {
    this.authService.signOut()
  }
}
