import { Ticket } from './../models/ticket';
import { UserResponse , User } from './../models/userResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http : HttpClient) { }

 //url api
 private apiUrl = environment.apiUrl

// get all users
getUsers(page: number, limit:number, lastname:string, firstname:string, email:string, adress:string, startregister, endregister): Observable <UserResponse> {
  if(lastname === null){lastname = ''}
  if(firstname === null){firstname = ''}
  if(email === null){email = ''}
  if(adress === null){adress = ''}
  if(startregister === null){startregister = ''}
  if(endregister === null){endregister = ''}
   return this.http.get<UserResponse>(`${this.apiUrl}/api/users/?page=${page}&limit=${limit}
   &lastname=${lastname}&firstname=${firstname}&email=${email}&adress=${adress}&startregister=${startregister}&endregister=${endregister}`);
}

// get user
getOneUser(id: string): Observable <User> {
  return this.http.get<User>(`${this.apiUrl}/${id}`);
}


// edit user
editOneUser(id: string, body): Observable <User> {
  return this.http.patch<User>(`${this.apiUrl}/api/users/${id}`, body);
}

// delete user
deleteOneUser(id: string): Observable <User> {
  return this.http.delete<User>(`${this.apiUrl}/api/users/${id}`);
}

// verifier gain user
verifyLotUser(id:string, code: Ticket): Observable <Ticket> {
  return this.http.post<Ticket>(`${this.apiUrl}/api/users/gain?id=${id}`,code);
}


}

