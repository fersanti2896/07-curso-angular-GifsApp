import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey = 'fgqXZEJAho3ZnAxqJm2yftTQuFKhtkUH';
  private _historial: string[] = [];

  get historial() {
    /* Rompemos la referencia al arreglo original usando el operador spread */
    return [...this._historial];
  }

  /* Inyectamos el mpodule */
  constructor(private http: HttpClient) { }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    /* Valida si el query no está repetido en el historial,  */
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);

      /* Se limita la cantidad de inserciones en el historial para que se muestren */
      this._historial = this._historial.slice(0, 10);
    }

    console.log(this._historial);

    /* Realizando la petición HTTP con el módulo httpClient al API de Gifs */
    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=fgqXZEJAho3ZnAxqJm2yftTQuFKhtkUH&q=dr house&limit=10').subscribe((resp: any) => {
      console.log(resp.data)
    });
  }
}
