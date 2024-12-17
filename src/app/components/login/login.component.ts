import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
