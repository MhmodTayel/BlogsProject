import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {


  constructor(private _apiService:ApiService) { }

  get(url:string){
   return this._apiService.get(url);
  }

  getById(url:string){
   return this._apiService.get(url);
  }

  create(body:FormData){
   return this._apiService.post('/create',body);
  }

  delete(id:any){
   return this._apiService.delete(id);
  }
}
