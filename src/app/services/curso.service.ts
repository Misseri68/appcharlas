import { Injectable, numberAttribute } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginService } from './login.service';
import axios from 'axios';
import { RondaService } from './ronda.service';

@Injectable({
    providedIn: 'root'
  })
  export class CursoService{
    private url = environment.apiCharlas + 'api/Profesor/AlumnosCursoProfesor';
    private urlCursos = environment.apiCharlas +"api/cursos"
     constructor(private _loginService: LoginService, private _rondaService: RondaService) { }

      getCursoProfesor(){
          axios.get(this.url,{headers:{
            "Authorization" :"Bearer " + this._loginService.getToken()
         }}).then(response=>{
             return response.data
          })
      }
      getCursos(){
        axios.get(this.urlCursos,{headers:{
          "Authorization" :"Bearer " + this._loginService.getToken()
       }}).then(response=>{
           return response.data
        })
    }

    getCursosPorId(id:number){
      axios.get(this.urlCursos,{headers:{
        "Authorization" :"Bearer " + this._loginService.getToken()
     }}).then(response=>{
         return response.data
      })
  }



  }
