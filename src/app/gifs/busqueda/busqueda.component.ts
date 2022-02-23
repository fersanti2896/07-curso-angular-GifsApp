import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  /* Inyectamos el servicio */
  constructor(private gifService: GifsService) { }

  buscar() {
    /* Extra el valor de la caja del input */
    const valor = this.txtBuscar.nativeElement.value;

    /* No deja que se guarde espacios en el input */
    if(valor.trim().length === 0) {
      return; 
    }

    /* Le pasa el valor a la función buscarGifs que está en el service y que lo guarda en un arreglo */
    this.gifService.buscarGifs(valor);

    /* Después de insertar el gif en el buscador, lo borra del input */
    this.txtBuscar.nativeElement.value = '';
  }
}
