import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FileModel } from "../models/FileModel";
import { LoginService } from "./login.service";
import { environment } from "../../environments/environment.development";
@Injectable({
  providedIn: 'root'
})
export class PostFilesService {

  url = environment.apiCharlas;

  constructor(private _http: HttpClient, private _loginService: LoginService) { }

    postFile(fileModel: FileModel, idusuario: number): Observable<any>{
        let json = JSON.stringify(fileModel);
        let request = "api/files/uploadimagenusuario/" + idusuario;
        let peticion = this.url  + request;
        return this._http.post(peticion, json, {
          headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " +  this._loginService.getToken()
          }
        });
    }
  }
