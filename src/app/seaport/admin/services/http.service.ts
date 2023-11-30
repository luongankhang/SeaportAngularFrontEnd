import { SortShips } from './../models/sort-ships';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Ships } from '../models/ships';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Berths } from '../models/berths';
import { Arrivals } from '../models/arrivals';
import { Departures } from '../models/departures';
import { Cargos } from '../models/cargos';
import { CargoDetails } from '../models/cargo-details';

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

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  public getAllShips(): Observable<Ships[]> {
    const url = `${this.REST_API_SERVER}/api/sea/gomap`;
    return this.http
      .get<Ships[]>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  Ships
  public getShips(): Observable<Ships[]> {
    const url = `${this.REST_API_SERVER}/api/sea/ships`;
    return this.http.get<Ships[]>(url, this.httpOptions);
  }

  public postShips(newShip: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/ships/insert`;
    return this.http
      .post<any>(url, newShip, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public putShip(id: number, newShips: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/ships/${id}`;
    return this.http.put(url, newShips, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to update ships:', error);
        return throwError(error);
      })
    );
  }

  public deleteShip(id: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/ships/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to delete ship:', error);
        return throwError(error);
      })
    );
  }

  //  Berths
  public getBerths(): Observable<Berths[]> {
    const url = `${this.REST_API_SERVER}/api/sea/berths`;
    return this.http.get<Berths[]>(url, this.httpOptions);
  }

  public postBerth(newBerth: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/berths/insert`;
    return this.http
      .post<any>(url, newBerth, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public putBerth(id: number, newBerth: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/berths/${id}`;
    return this.http.put(url, newBerth, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to update ships:', error);
        return throwError(error);
      })
    );
  }

  public deleteBerth(id: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/berths/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to delete ship:', error);
        return throwError(error);
      })
    );
  }

  //  Arrivals
  public getArrivals(): Observable<Arrivals[]> {
    const url = `${this.REST_API_SERVER}/api/sea/arrivals`;
    return this.http.get<Arrivals[]>(url, this.httpOptions);
  }

  public postArrivals(newArrival: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/arrivals/insert`;
    return this.http
      .post<any>(url, newArrival, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public putArrival(id: number, newArrival: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/arrivals/${id}`;
    return this.http.put(url, newArrival, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to update ships:', error);
        return throwError(error);
      })
    );
  }

  public deleteArrival(id: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/arrivals/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to delete ship:', error);
        return throwError(error);
      })
    );
  }

  //  Departures
  public getDepartures(): Observable<Departures[]> {
    const url = `${this.REST_API_SERVER}/api/sea/departures`;
    return this.http.get<Departures[]>(url, this.httpOptions);
  }

  public postDeparture(newDeparture: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/departures/insert`;
    return this.http
      .post<any>(url, newDeparture, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public putDeparture(id: number, newDeparture: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/departures/${id}`;
    return this.http.put(url, newDeparture, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Failed to update ships:', error);
        return throwError(error);
      })
    );
  }

  //  Cargos
  public getCargos(): Observable<Cargos[]> {
    const url = `${this.REST_API_SERVER}/api/sea/cargos`;
    return this.http.get<Cargos[]>(url, this.httpOptions);
  }

  public postCargo(newCargo: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/cargos/insert`;
    return this.http
      .post<any>(url, newCargo, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  SortShips
  public getSort(): Observable<SortShips[]> {
    const url = `${this.REST_API_SERVER}/api/sea/sortships`;
    return this.http.get<SortShips[]>(url, this.httpOptions);
  }

  public postSortShip(newSortShip: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/sortships/insert`;
    return this.http
      .post<any>(url, newSortShip, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  CargoDetails
  public getCargoDetails(): Observable<CargoDetails[]> {
    const url = `${this.REST_API_SERVER}/api/sea/cargodetails`;
    return this.http.get<CargoDetails[]>(url, this.httpOptions);
  }

  public postCargoDetail(newCargo: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/api/sea/cargodetails/insert`;
    return this.http
      .post<any>(url, newCargo, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //  Image
  public getImage(fileName: string): Observable<SafeUrl> {
    const imageUrl = `${this.REST_API_SERVER}/api/sea/fileupload/files/${fileName}`;
    return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
      map((response: Blob) => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(response);
        return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      }),
      catchError((error) => {
        console.error('Failed to load image:', error);
        return of(''); // Return an empty string or any default image URL
      })
    );
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
