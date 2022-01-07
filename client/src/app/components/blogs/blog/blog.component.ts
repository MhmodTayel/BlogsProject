import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogApiService } from './../../../services/blog-api.service';
import { Blog } from './../../../models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blog:any ={}

  constructor(private _blogApiService:BlogApiService,private _ativatedRoute:ActivatedRoute) { }
  checkLogging(){
    const token = localStorage.getItem('token')
    return token
  }
  ngOnInit(): void {
    this._ativatedRoute.paramMap.subscribe(params=>{

      
     this._blogApiService.getById(`/${params.get('id')}`).subscribe(
       (res:any)=>{
          this.blog = res 
            
     });

    });
  }

  load(){
    if(this.blog.title) return true
    return false
  }

  hasBlog(blog:Blog){

    const token:any = localStorage.getItem('token')
    if(token){
      const currentUser = JSON.parse(atob(token.split('.')[1])).username
      const blogAuthor = blog.author.username
      return blogAuthor == currentUser
    }
    return false

  }

}
