import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceCharla } from '../../services/charla.service';
import { Charla } from '../../models/Charla';
import { Comentario } from '../../models/Comentario';
import { Usuario } from '../../models/Usuario';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-charla',
  standalone: true,
  templateUrl: './detalle-charla.component.html',
  styleUrls: ['./detalle-charla.component.scss'],
  providers: [ServiceCharla, UserService],
  imports: [CommonModule],
})
export class DetalleCharlaComponent implements OnInit {
  public charla: Charla | null = null;
  public comentarios: Comentario[] = [];
  public comentariosConUsuarios: Array<{ comentario: Comentario; usuario: Usuario | null }> = [];
  fotoPerfilUsuario :string = 'assets/images/test.jpg';

  constructor(
    private _route: ActivatedRoute,
    private _charlaService: ServiceCharla,
    private _userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this._route.snapshot.paramMap.get('id'); // Obtener el ID de la charla
    this.getImagenPerfil();

    if (id) {
      try {
        // Obtener charla y comentarios
        const data = await this._charlaService.getCharlaPorId(+id);
        if (data) {
          this.charla = data.charla || null;
          this.comentarios = data.comentarios || [];
        }

        // Obtener detalles de cada usuario asociado a los comentarios
        this.comentariosConUsuarios = await Promise.all(
          this.comentarios.map(async (comentario) => {
            const usuario = await this._userService.getUsuarioPorId(comentario.idUsuario).catch(() => null);
            return { comentario, usuario };
          })
        );
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    }
  }

  getImagenPerfil(){
    console.log("Hola")
    this._userService.getPerfil().then(perfil => {
      if(perfil?.imagen){
        this.fotoPerfilUsuario = perfil.imagen;
        console.log(this.fotoPerfilUsuario)
      }else{
        this.fotoPerfilUsuario = ''
      }
    })
  }
}
