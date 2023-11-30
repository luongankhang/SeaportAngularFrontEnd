import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private REST_API_SERVER = environment.REST_API_SERVER;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<Users[]> {
    const url = `${this.REST_API_SERVER}/api/sea/users`;
    return this.http.get<Users[]>(url, this.httpOptions);
  }

  public postUser(newUser: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/users/insert`;
    return this.http.post<any>(url, newUser, this.httpOptions);
  }

  public putUser(id: number, newUser: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/users/${id}`;
    return this.http.put<any>(url, newUser, this.httpOptions);
  }

  public uploadFile(file: File): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/fileupload`;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const httpOptions = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
    };

    return this.http.post<any>(url, formData, httpOptions);
  }
}
