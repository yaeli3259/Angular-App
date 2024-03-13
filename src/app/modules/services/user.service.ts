import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private _http:HttpClient){}
//server
getUserFromServer():Observable<User[]>
{
   return this._http.get<User[]>("/api/User");
}
//server
postUserToServer(user:User[]): Observable<boolean>
{   
   return this._http.post<boolean>("/api/User/" ,user);
}

}
