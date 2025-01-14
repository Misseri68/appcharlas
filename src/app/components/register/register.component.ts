import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Usuario } from '../../models/Usuario';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [FormsModule, RouterLink, CommonModule],
})
export class RegisterComponent {

  onStudentSubmit(formEstudiante: NgForm) {
    const { nombre, apellido, email, password, confirmPassword, accessCode } = formEstudiante.value;

    const jsonRegister: any = {
      nombre: nombre,
      apellidos: apellido,
      email: email,
      password: password,
      accessCode: accessCode,
      estadoUsuario: true,
      idRole: 2,
      imagen: ""
  };

    this._registerServ.createAlumno(
      jsonRegister, accessCode
    ).then(statusCode => {
      if (statusCode === 200) {
        console.log('Usuario registrado');
        this._router.navigate(['/login']);
      } else {
        console.error('Registration failed with status code:', statusCode);
      }
    })  }

    //TODO VALIDACIONES DE CAMPOS
    //TODO FORM PROFESORES


  onTeacherSubmit(formProfesor: NgForm) {
    const { nombre, apellido, email, password, confirmPassword, accessCode } = formProfesor.value;

    const jsonRegister = {
      nombre,
      apellidos: apellido,
      email,
      password,
      accessCode
    };
  }

  esAlumno: boolean = true;

  constructor(private _router: Router, private _registerServ: RegisterService) { }

  onSubmit(form: NgForm) {

  }



  usuarioPrueba: Usuario = {
    "idUsuario": 93,
    "nombre": "string",
    "apellidos": "string",
    "email": "string123456@tajamar365.com",
    "estadoUsuario": true,
    "password": "string",
    "imagen": "string",
    "idRole": 2
  }

}
