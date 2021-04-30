import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CredentialsDto } from '../../../models/CredentialsDto';
import { UserService } from 'src/app/services/user.service';
import { LoadingButtonComponent } from '../../loading-button/loading-button.component';

export interface LoginFormData {
  credentialsDto?: CredentialsDto;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  // @ts-ignore
  @ViewChild(LoadingButtonComponent) loadingButton: LoadingButtonComponent;
  errorMessage: string | null = null;

  loginForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern('^[a-zA-Z]+[a-zA-Z\\d_]+$'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
        Validators.pattern('[A-Za-z\\d@!#$%^&*_+=~]+$'),
      ],
    ],
  });

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userService.checkRedirect();
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.userService
      .login(
        new CredentialsDto(
          this.loginForm.controls.username.value,
          this.loginForm.controls.password.value
        )
      )
      .subscribe(
        (response) => {
          this.userService.postLogin(response);
        },
        (err) => {
          this.loadingButton.loading = false;
          this.errorMessage =
            err.error.message || 'An error occurred, please try again later.';
        }
      );
  }
}
