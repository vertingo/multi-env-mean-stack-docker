import { Restaurant } from './../models/restaurant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http : HttpClient) { }

  //url api
  private apiUrl = environment.apiUrl

  // get users
getRestaurants(): Observable<Restaurant[]> {
  return this.http.get<Restaurant[]>(`${this.apiUrl}/api/restaurants`);
}



}
