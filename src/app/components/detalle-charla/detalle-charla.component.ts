import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceComentario } from '../../services/comentario.service';
import { ServiceCharla } from '../../services/charla.service';
import { Charla } from '../../models/Charla';
import { Comentario } from '../../models/Comentario';
import { Usuario } from '../../models/Usuario';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RondaService } from '../../services/ronda.service';
import { ServiceVoto } from '../../services/voto.service';
import { Votacion } from '../../models/Votacion';

@Component({
  selector: 'app-detalle-charla',
  standalone: true,
  templateUrl: './detalle-charla.component.html',
  styleUrls: ['./detalle-charla.component.scss'],
  providers: [ServiceComentario, ServiceCharla, UserService, RondaService],
  imports: [CommonModule, FormsModule],
})
export class DetalleCharlaComponent implements OnInit {
  public charla: Charla | null = null;
  public comentarios: Comentario[] = [];
  public nuevoComentario: string = ''; // Variable para el nuevo comentario
  public usuarioId: number | null = null; // ID del usuario logueado
  fotoPerfilUsuario: string = 'assets/images/test.jpg';
  public nombreUsuario: string = '';
  public numVotos: number = 0;

  idCharla!: number;
  idRonda!: number | null;
  idUsuario!:  number ;


  constructor(
    private _route: ActivatedRoute,
    private _charlaService: ServiceCharla,
    private _comentarioService: ServiceComentario,
    private _userService: UserService,
    private _rondaService: RondaService,
    private _votoService : ServiceVoto
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this._route.snapshot.paramMap.get('id'); // Obtener el ID de la charla
    await this.obtenerUsuarioLogueado(); // Obtener el ID del usuario logueado
    this.getImagenPerfil();
    this.getVotos()


    if (id) {
      try {
        // Obtener charla y comentarios
        const data = await this._charlaService.getCharlaPorId(+id);
        if (data) {
          this.charla = data.charla || null;
          this.comentarios = data.comentarios || [];

        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    }
  }

  // Método para obtener el ID del usuario logueado
  async obtenerUsuarioLogueado(): Promise<void> {
    try {
      const perfil = await this._userService.getPerfil();
      this.usuarioId = perfil?.idUsuario || null;
      this.nombreUsuario = perfil?.nombre || 'Usuario Anónimo';
    } catch (error) {
      console.error('Error al obtener el usuario logueado:', error);
    }
  }

  // Método para enviar un nuevo comentario
  async enviarComentario(): Promise<void> {
    if (this.nuevoComentario.trim() && this.charla && this.usuarioId) {
      const comentario = new Comentario(
        0, // ID generado por el servidor
        this.charla.idCharla,
        this.usuarioId, // ID del usuario logueado
        '', // Usuario no necesario aquí
        this.nuevoComentario.trim(),
        new Date()
      );

      try {
        const comentarioGuardado = await this._comentarioService.postComentario(comentario);
        this.comentarios.push({
          ...comentarioGuardado,
          usuario: this.nombreUsuario, // Ajustar si el servidor no devuelve el usuario
        }); // Añadir el comentario a la lista
        this.nuevoComentario = ''; // Limpiar el campo de entrada
      } catch (error) {
        console.error('Error al enviar el comentario:', error);
      }
    }
  }


  getImagenPerfil() {
    this._userService.getPerfil().then((perfil) => {
      if (perfil?.imagen) {
        this.fotoPerfilUsuario = perfil.imagen;
      } else {
        this.fotoPerfilUsuario = 'assets/images/userdefault.png';
      }
    });
  }

  async getVotos(){
    const rondaActiva = await this._rondaService.getRondaActiva()
    const id = this._route.snapshot.paramMap.get('id');
    let idNum = 0
    if (id!= null){
       idNum = parseInt(id)
    }
    if(rondaActiva!=null){
      this.numVotos = await this._votoService.getNumVotosPorCharla(idNum)
    }
    //Si ronda es nulo significa que no hay ronda activa es decir que ya ha pasado la ronda
    //por lo cual ya podremos mostrar los votos

}


  async votarCharla(){
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.idCharla = parseInt(id);
    }
    this.idRonda = await this._rondaService.getRondaActiva()??0;
    const usuario = await this._userService.getPerfil();
    this.usuarioId = usuario?.idUsuario ?? 0;
    const voto = new Votacion(1, this.idCharla, this.idUsuario, this.idRonda);
    this._votoService.postVoto(voto);
  }
}
