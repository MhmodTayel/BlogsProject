import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient,) { }

  get(url:string)
  {
    return this._http.get(`${environment.apiURL}${url}` );
  }
 

  post(url:string,body:any)
  {
    return this._http.post(`${environment.apiURL}${url}`,body);
  }
  
  patch(url:string,body:object)
  {
 
    return this._http.patch(`${environment.apiURL}${url}`,body);
  }
  
  delete(id:any)
  {
    return this._http.delete(`${environment.apiURL}/${id}`);
  }
}
