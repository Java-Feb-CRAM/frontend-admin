import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CredentialsDto } from '../../../models/CredentialsDto';
import { UserService } from 'src/app/services/user.service';

export interface LoginFormData {
  credentialsDto?: CredentialsDto;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern("^[a-zA-Z]+[a-zA-Z\\d_]+$"),
      ],
    ],
    password: [
      '', 
      [
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern("[A-Za-z\\d@!#$%^&*_+=~]+$"),
      ],
    ],
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.userService.checkRedirect()
  }

  onSubmit(): void {
    this.userService.login(new CredentialsDto(
      this.loginForm.controls.username.value, 
      this.loginForm.controls.password.value));
  }
}