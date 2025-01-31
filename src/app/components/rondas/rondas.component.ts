import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RondaService } from '../../services/ronda.service';
import { CommonModule } from '@angular/common';
import { Ronda } from '../../models/Rondas';
import { UserService } from '../../services/user.service';

@Component({
  standalone: true,
  selector: 'app-rondas',
  templateUrl: './rondas.component.html',
  styleUrl: './rondas.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})
export class RondasComponent {
  idCursoUsuario: number = 0;
  rondaForm: FormGroup;
  rondas: any[] = [];
  showRondaForm: boolean = false;
  rondaToEdit: any = null;

  constructor(private fb: FormBuilder, private _rondaService: RondaService, private _userService: UserService) {
    this.rondaForm = this.fb.group({
      idRonda: [0],
      fechaPresentacion: ['', Validators.required],
      fechaCierre: ['', Validators.required],
      duracion: [0, Validators.required],
      descripcionModulo: ['', Validators.required],
      fechaLimiteVotacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._userService.getCursoUsuario().then(response => {
      this.idCursoUsuario = response;
    });
    this.cargarRondas();

  }

  onSubmit(): void {
    if (this.rondaForm.valid) {
      const formValue = this.rondaForm.value;
      const formatDate = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toISOString(); // Convierte a formato ISO 8601 con milisegundos y zona horaria
      };

      // Formatea las fechas
      const fechaPresentacion = formatDate(formValue.fechaPresentacion);
      const fechaCierre = formatDate(formValue.fechaCierre);
      const fechaLimiteVotacion = formatDate(formValue.fechaLimiteVotacion);

      // Crea el objeto ronda con las fechas formateadas
      const ronda = new Ronda(
        formValue.idRonda,
        this.idCursoUsuario,
        fechaPresentacion,
        fechaCierre,
        formValue.duracion,
        formValue.descripcionModulo,
        fechaLimiteVotacion
      );

         if (this.rondaToEdit) {
          this._rondaService.updateRonda(ronda).then((response: any) => {
            console.log('Ronda actualizada:', response);
            this.cargarRondas();
            this.toggleShowRondaForm(); // Cerrar el formulario
          });
        } else {
          this._rondaService.createRonda(ronda).then((response: any) => {
            console.log('Ronda creada:', response);
            this.cargarRondas();
            this.toggleShowRondaForm(); // Cerrar el formulario
          });
        }
    }
  }


  cargarRondas() {
    this._rondaService.getRondasProfesor().then((response: any) => {
      this.rondas = response;
    });
  }

  editarRonda(ronda: any) {
    this.showRondaForm = true;
    this.rondaToEdit = ronda;

    // Rellenar el formulario con los datos de la ronda a editar
    this.rondaForm.patchValue({
      idRonda: ronda.idRonda,
      idCursoUsuario: ronda.idCursoUsuario,
      fechaPresentacion: ronda.fechaPresentacion,
      fechaCierre: ronda.fechaCierre,
      duracion: ronda.duracion,
      descripcionModulo: ronda.descripcionModulo,
      fechaLimiteVotacion: ronda.fechaLimiteVotacion
    });
  }

  eliminarRonda(idRonda: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta ronda?')) {
      this._rondaService.deleteRonda(idRonda).then((response: any) => {
        console.log('Ronda eliminada:', response);
        this.cargarRondas();
      });
    }
  }

  toggleShowRondaForm() {
    if(this.rondaToEdit != null){
      this.rondaForm.reset();
      this.rondaToEdit = null;
    }
    else{
      this.showRondaForm = !this.showRondaForm;
    }
    if (!this.showRondaForm) {
      this.rondaForm.reset();
      this.rondaToEdit = null;
    }

  }
}
