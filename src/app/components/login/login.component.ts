
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  // Necesario para usar directivas comunes como ngIf, ngFor
import { FormsModule } from '@angular/forms';    // Necesario para usar ngForm
import { LoginService } from '../../services/login.service'; // Importa el servicio de login


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Hace que el componente sea standalone
  imports: [CommonModule, FormsModule]  // Importa los módulos necesarios dentro del componente
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
