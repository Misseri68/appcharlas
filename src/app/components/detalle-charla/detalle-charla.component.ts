import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceCharla } from '../../services/charla.service';
import { Charla } from '../../models/Charla';

@Component({
  selector: 'app-detalle-charla',
  standalone: true,
  templateUrl: './detalle-charla.component.html',
  styleUrls: ['./detalle-charla.component.scss'],
  providers: [ServiceCharla],
})
export class DetalleCharlaComponent implements OnInit {

  public charla: Charla | null = null;

  constructor(private route: ActivatedRoute, private charlaService: ServiceCharla) { }
  

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.charlaService.getCharlaPorId(+id).then((data) => {
    
        this.charla = data;
        console.log('Detalles de la charla:', data);
      }).catch((error) => {
        console.error('Error al cargar los detalles de la charla:', error);
      });
    }
  }

}
