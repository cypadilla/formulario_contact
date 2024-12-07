import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://cincoveinticinco.com/users.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(this.apiUrl) // Define el tipo esperado en la respuesta
      .pipe(
        map(response => response.users || []) // Accede a la propiedad `users` y retorna un array vacío si no existe
      );
  }

}
