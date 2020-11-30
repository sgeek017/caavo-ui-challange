import { UserModel } from './../model/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json";

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<UserModel[]> {
    return this._http.get<UserModel[]>(this.API_URL);
  }
}
