import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey = 'fgqXZEJAho3ZnAxqJm2yftTQuFKhtkUH';
  private apiURL = 'https://api.giphy.com/v1/gifs/search';
  private _historial: string[] = [];

  /* Aqui almacenaremos la data que devuelve el api */
  public resultados: Gif[] = [];

  get historial() {
    /* Rompemos la referencia al arreglo original usando el operador spread */
    return [...this._historial];
  }

  /* Inyectamos el mpodule */
  constructor(private http: HttpClient) { 
    /* Reconstruimos lo que se tiene en el LocalStorage en la plataforma del cliente */
    this._historial = JSON.parse(localStorage.getItem('historial')!);
    this.resultados = JSON.parse(localStorage.getItem('resultados')!);
   }

  buscarGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    /* Valida si el query no está repetido en el historial,  */
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);

      /* Se limita la cantidad de inserciones en el historial para que se muestren */
      this._historial = this._historial.slice(0, 10);

      /* Guardamos la busqueda en el LocalStorage */
      localStorage.setItem('historial', JSON.stringify(this._historial));

      /* Guardamos las imagenes en el LocalStorage */
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    }

    console.log(this._historial);

    /* Realizando la petición HTTP con el módulo httpClient al API de Gifs */
    this.http.get<SearchGifsResponse>(`${this.apiURL}?api_key=${this.apiKey}&q=${query}&limit=10`)
      .subscribe((resp: SearchGifsResponse) => {
        console.log(resp.data)
        this.resultados = resp.data;
    });
  }
}
