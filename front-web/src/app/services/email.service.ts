import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../models/email';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http : HttpClient) { }

  //url api
  private apiUrl = environment.apiUrl

// send email 
sendEmail(data : Email, email: string, isgain: string, isactiive: string): Observable<Email> {
  return this.http.post<Email>(`${this.apiUrl}/api/emails/send?email=${email}&isgain=${isgain}&isactive=${isactiive}`,data);
}


  // get emails
  getAllEmail(): Observable<Email[]> {
    return this.http.get<Email[]>(`${this.apiUrl}/api/emails`);
  }
  
}