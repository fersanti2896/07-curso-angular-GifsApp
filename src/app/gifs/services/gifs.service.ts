import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];

  get historial() {
    /* Rompemos la referencia al arreglo original usando el operador spread */
    return [...this._historial];
  }

  buscarGifs(query: string) {
    this._historial.unshift(query);

    console.log(this._historial);
  }
}
