import { Contact } from './../models/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  //url api
  private apiUrl = environment.apiUrl

  // send message contact
  sendMsgContact(credentials): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/contact`, credentials);
  }


  // get contact open
  getOpenMessage(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/api/contact/open`);
  }


  // get contact close
  getColseMessage(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/api/contact/closed`);
  }

  // close contact
  closeContact(body): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/contact`, body);
  }


  // response contact
  responseContact(id, body): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/contact/response?id=${id}`, body);
  }
}