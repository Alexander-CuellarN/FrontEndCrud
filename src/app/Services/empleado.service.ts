import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Empleado } from '../Interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private endPoint = environment.endPoint + "Empleado/"
  constructor(private _http: HttpClient) { }

  getList(): Observable<Empleado[]> {
    return this._http.get<Empleado[]>(`${this.endPoint}`);
  }

  add(empleado: Empleado): Observable<Empleado> {
    return this._http.post<Empleado>(`${this.endPoint}`, empleado);
  }

  update(id:number, empleado: Empleado): Observable<Empleado>{
    return this._http.put<Empleado>(`${this.endPoint}${id}`, empleado);
  }

  delete(id:number): Observable<void>{
    return this._http.delete<void>(`${this.endPoint}${id}`);
  }
}
