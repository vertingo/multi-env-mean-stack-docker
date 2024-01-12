import { StatisticResponse } from './../models/statisticResponse';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http : HttpClient) { }


//  header de requete http
private headers = new HttpHeaders(
  // {  'Access-Control-Allow-Origin':'*',
  // // 'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
  // // {'Content-Type': 'application/json',}
  // // 'Access-Control-Allow-Methods': 'POST, GET',
  //  }
);


// get statistic
getStatistic(): Observable<StatisticResponse> {
//  return this.http.get<StatisticResponse>('assets/data/stat.json');
const options = { headers: this.headers};
 return this.http.get<StatisticResponse>('http://localhost:4000/api/tickets/stats',options);
}




}
