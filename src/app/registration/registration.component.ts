import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: []
})
export class RegistrationComponent {
  public showPassword = false;

  public email: string = '';
  public password1: string  = '';
  public password2: string  = '';

  public registrating: boolean = false;

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

  async register() {
    if (this.email && this.password1 === this.password2){
      try {
        this.registrating = true
        const { user }: auth.UserCredential = await this.authService.createUserWithEmailAndPassword(this.email, this.password1);

        localStorage.setItem('rubiks-uid', user.uid)
        this.router.navigateByUrl('/')
      } finally {
        this.registrating = false
      }
    }
  }

  async loginWithGoogle() {
    try {
      this.registrating = true;
      const { user }: auth.UserCredential = await this.authService.signInWithPopup(new auth.GoogleAuthProvider());

      localStorage.setItem('rubiks-uid', user.uid)
      this.router.navigateByUrl('/')
    } finally {
      this.registrating = false;
    }
  }

  async loginWithGitHub() {
    try {
      this.registrating = true;
      const { user }: auth.UserCredential = await this.authService.signInWithPopup(new auth.GithubAuthProvider());

      localStorage.setItem('rubiks-uid', user.uid)
      this.router.navigateByUrl('/')
    } finally {
      this.registrating = false;
    }
  }

}
