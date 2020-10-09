import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public showPassword = false;

  public email: string = '';
  public password1: string  = '';
  public password2: string  = '';

  constructor(public authService: AngularFireAuth) { }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }
  async loginWithGoogle(){
    try{
    await this.authService.signInWithPopup(new auth.GoogleAuthProvider());
    }catch(e){
      console.log(e)
    }
  }
  async loginWithGitHub(){
    try{
    await this.authService.signInWithPopup(new auth.GithubAuthProvider());
  }catch(e){
    console.log(e)
  }
}

  async register() {
    var mail = (<HTMLInputElement>document.getElementById(mail)).value;
    var password1 = (<HTMLInputElement>document.getElementById(password1)).value;
    var password2 = (<HTMLInputElement>document.getElementById(password2)).value;
    if (password1 = password2){
      try{
    await this.authService.createUserWithEmailAndPassword(mail, password1);
    }catch(e){
      console.log(e)
    }
    }else{
      console.log("Die beiden Passwörter stimmen nicht überein!")
    }
  }
}
