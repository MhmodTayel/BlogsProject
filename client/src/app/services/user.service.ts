import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _apiService:ApiService) { }

  register(body:object){
   return this._apiService.post('/users/register',body)
  }

  login(body:object){
   return this._apiService.post('/users/login',body)
  }

  // body => username to follow => add to following array | id => id of logged in user 
  follow(id:string,username:string){
    
   return this._apiService.patch(`/users/follow/${id}`,{username})
    
  }
  like(id:string,blogId:string){
    
   return this._apiService.patch(`/users/like/${id}`,{blogId})
    
  }
  getFollowing(id:string){
   return this._apiService.get(`/users/following/${id}`)
    
  }
  getlikes(id:string){
   return this._apiService.get(`/users/likes/${id}`)
    
  }
}
