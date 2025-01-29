import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormsModule, NgForm, ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [ RouterLink, CommonModule, ReactiveFormsModule],
})
export class RegisterComponent {

  esAlumno: boolean = true;
  registerForm: FormGroup;
  formSubmitted = false;


  constructor(private fb: FormBuilder, private _router: Router, private _registerServ: RegisterService) {
    this.registerForm = this.crearFormGroup();

  }

  onSubmit() {

    this.formSubmitted = true;
  if(this.registerForm.valid) {
    let rol = this.esAlumno ? 2 : 1;
    const { nombre, apellido, email, password, confirmPassword, accessCode } = this.registerForm.value;

    const jsonRegister: any = {
      nombre: nombre,
      apellidos: apellido,
      email: email,
      password: password,
      accessCode: accessCode,
      estadoUsuario: true,
      idRole: rol,
      imagen: ""
    };

    this._registerServ.createUsuario(jsonRegister, accessCode, this.esAlumno).then(statusCode => {
      if (statusCode === 200) {
        console.log('Usuario registrado');
        this._router.navigate(['/login']);
      } else {
        console.error('Registration failed with status code:', statusCode);
      }
    })
  }else{
    //TODO ALERTAR DE QUE ES INVALIDO
  }

  }

  crearFormGroup() {
    return this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator('@tajamar365.com')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      accessCode: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  emailDomainValidator(domain: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email = control.value;
      return email?.endsWith(domain) ? null : { invalidDomain: true };
    };
  }





}
