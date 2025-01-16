import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, RouterModule, CommonModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _router: Router, private _loginServ: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator('tajamar365.com')]], // Validación de email
      password: ['', [Validators.required, Validators.minLength(5)]] // Validación de contraseña
    });
  }

  emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      return email?.endsWith(domain) ? null : { invalidDomain: true };
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._loginServ.login(email, password).then(statusCode => {
        if (statusCode === 200) {
          this._router.navigate(['/dashboard']);
        } else{
          console.error('Login failed with status code:', statusCode);
        }
      })
    }
  }
}

