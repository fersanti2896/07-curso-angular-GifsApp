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

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    /* Valida si el query no está repetido en el historial,  */
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);

      /* Se limita la cantidad de inserciones en el historial para que se muestren */
      this._historial = this._historial.slice(0, 10);
    }

    console.log(this._historial);
  }
}
