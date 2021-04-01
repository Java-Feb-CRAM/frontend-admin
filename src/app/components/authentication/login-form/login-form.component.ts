import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CredentialsDto } from 'src/app/models/CredentialsDto';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent{
  username = "";
  password = "";
  
  constructor(private userService: UserService) { }
  
  login(): void {
    this.userService.login(new CredentialsDto(this.username, this.password))
  }
}
