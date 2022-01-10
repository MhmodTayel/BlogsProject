import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { BlogApiService } from './../../services/blog-api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any = {}
  blogs:any=[]
  constructor(private _ativatedRoute:ActivatedRoute,private _userService: UserService,private blogService:BlogApiService) { }

  ngOnInit(): void {
    this._ativatedRoute.paramMap.subscribe(params=>{
      
      this._userService.get(params.get('username')).subscribe(
        (res:any)=>{
           this.user = res[0] 
           this.blogService.getBlogByUserId(this.user._id).subscribe(res=>{
            this.blogs=res
           })

             console.log(this.user)
      });
 
     });
  }

}
