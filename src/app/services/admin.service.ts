import { Profesor } from "../models/Profesor";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { LoginService } from "./login.service";
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private url = environment.apiCharlas + 'api/admin/';

    constructor(private _loginService: LoginService) { }

    async getProfesores(): Promise<Profesor[] | null> {
        try {
            const response = await axios.get(this.url + "profesores", {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + this._loginService.getToken()
                }
            });

            console.log("✅ Respuesta de la API:", response.data); // Verificar estructura de la API

            // Validar que response.data existe y tiene la estructura correcta
            if (!response.data) {
                console.warn("⚠️ No se encontraron profesores en la respuesta.");
                return null;
            }

            return response.data.map((prof: any) => new Profesor(
                prof.idUsuario,
                prof.usuario,
                prof.estadoUsuario,
                prof.imagen,
                prof.email,
                prof.idRole,
                prof.role,
                prof.idCurso,
                prof.curso,
                prof.fechaInicioCurso,
                prof.fechaFinCurso,
                prof.idCursosUsuarios
            ));

        } catch (error) {
            console.error("❌ Error al obtener los profesores:", error);
            return null;
        }


    }

    desactivarProfesor(id: number, estado: boolean): Promise<any> {
      const body = {
        id: id,
        estado: estado
      };

      return axios.put(this.url+"UpdateEstadoProfesor/"+id+"/"+estado, body, {
        headers: {
          "Content-Type": "application/json",  // Asegúrate de que la API espera este tipo de contenido
          "Authorization": "Bearer " + this._loginService.getToken()  // Si necesitas un token para autenticarte
        }
      })
      .then(response => response.data)  // Devuelve la respuesta de la API
      .catch(error => {
        console.error("Error al actualizar estado:", error);
        throw error;  // Lanza el error para que el componente lo pueda manejar
      });
    }

}
