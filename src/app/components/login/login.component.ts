import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  // Necesario para usar directivas comunes como ngIf, ngFor
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';    // Necesario para usar ngForm
import { LoginService } from '../../services/login.service'; // Importa el servicio de login
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Hace que el componente sea standalone
  imports: [CommonModule, ReactiveFormsModule, RouterLink]  // Importa los módulos necesarios dentro del componente
})
export class LoginComponent {
  loginForm: FormGroup;


  constructor(private _service: LoginService, private fb: FormBuilder, private _router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator('tajamar365.com')]], // Validación de email
      password: ['', [Validators.required, Validators.minLength(5)]] // Validación de contraseña
    });
  };

  //Funcion para controlar el click del logueo
  handleLoginClick() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this._service.login(email, password).then(response => {
        if (response == 200) {
          this._router.navigate(['/dashboard']);
        } else {
          console.log("Error... \n Email:" + email + " \n Password:" + password)
          console.error('Status code:' + response);

        }

      })
    }

  }

  emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      return email?.endsWith(domain) ? null : { invalidDomain: true };
    }
  }


}
