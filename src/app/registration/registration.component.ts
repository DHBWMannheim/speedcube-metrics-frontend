import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  value = '';
  onEnter(value: string){
    this.value = value
  }

  constructor(public authService: AngularFireAuth) { }

  ngOnInit(): void {
  }
  async loginWithGoogle(){
    await this.authService.signInWithPopup(new auth.GoogleAuthProvider());
  }
  async loginWithGitHub(){
    await this.authService.signInWithPopup(new auth.GithubAuthProvider());
  }

  async register() {
    var mail = (<HTMLInputElement>document.getElementById(mail)).value;
    var password1 = (<HTMLInputElement>document.getElementById(password1)).value;
    var password2 = (<HTMLInputElement>document.getElementById(password2)).value;
    if (password1 = password2){
    await this.authService.createUserWithEmailAndPassword(mail, password1);
    }
  }
}
