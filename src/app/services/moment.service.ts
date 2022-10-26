import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Moment } from '../Moment';

import { Response } from '../Response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl
  private apiUrl = `${this.baseApiUrl}api/moments`

  constructor(private http: HttpClient) { }

  getMoments(): Observable<Response<Moment[]>>{              //Retornando os momentos em Home
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  getMoment(id: Number): Observable<Response<Moment>>{      //Retornando um momento específico
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Response<Moment>>(url)
  }

  createMoment(formData: FormData): Observable<FormData> {  //Criando um momento
    return this.http.post<FormData>(this.apiUrl, formData)
  }

  removeMoment(id: Number) {                                //Deletando um momento
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url)
  }

  updateMoment(id: Number, formData: FormData) {           //Atualizando um momento
    const url = `${this.apiUrl}/${id}`
    return this.http.put<FormData>(url, formData)
  }
}
