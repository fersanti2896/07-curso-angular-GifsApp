import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent{

  /* Inyectamos al Servicio */
  constructor(private gifsService: GifsService) { }

  get historial() {
    return this.gifsService.historial;
  }

  buscar(termino: string) {
    console.log(termino)
    this.gifsService.buscarGifs(termino);
  }
}
