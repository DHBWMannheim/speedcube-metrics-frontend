import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
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

  async loginWithGoogle() {
    try {
      this.loggingIn = true;
      const { user }: auth.UserCredential = await this.authService.signInWithPopup(new auth.GoogleAuthProvider());

      localStorage.setItem('rubiks-uid', user.uid)
      this.router.navigateByUrl('/')
    } finally {
      this.loggingIn = false;
    }
  }

  async loginWithGitHub() {
    try {
      this.loggingIn = true;
      const { user }: auth.UserCredential = await this.authService.signInWithPopup(new auth.GithubAuthProvider());

      localStorage.setItem('rubiks-uid', user.uid)
      this.router.navigateByUrl('/')
    } finally {
      this.loggingIn = false;
    }
  }
}
