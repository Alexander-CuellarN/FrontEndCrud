import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { Departamento } from '../Interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private endPoint = environment.endPoint + "Departamento/";

  constructor(private _http: HttpClient) { 
  }


  getList():Observable<Departamento[]> {
    return this._http.get<Departamento[]>(`${this.endPoint}`);
  }
}
