import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';  // Necesario para directivas comunes

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule]  // Importa CommonModule aquí
})
export class LoginComponent {
    @ViewChild("cajaemail") cajaEmail!: ElementRef;
    @ViewChild("cajapass") cajaPass!: ElementRef;

    constructor(private _service:LoginService){};

    //Funcion para controlar el click del logueo
    handleLoginClick(){
      let email = this.cajaEmail.nativeElement.value;
      let password = this.cajaPass.nativeElement.value;
       this._service.login(email,password).then(response=>{
        if (response == 200) {
          console.log("Usuario logueado correctamente \n Email:"+email+" \n Password:"+password)
        }else{
          console.log("Error... \n Email:"+email+" \n Password:"+password)
        }

       })

    }
}
