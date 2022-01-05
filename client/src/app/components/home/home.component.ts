import { Component, OnInit } from '@angular/core';
import { BlogApiService } from './../../services/blog-api.service';
import { Blog } from './../../models/blog';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogs:Blog[] = []
  constructor(private _blogApiService:BlogApiService) { }

  ngOnInit(): void {
    this._blogApiService.get('/').subscribe((res:any)=>{
      this.blogs = res
    },()=>{})
  }
  checkLogging(){
    const token = localStorage.getItem('token')
    return token
  }







// ( blog => author => username ) x (who is logged in)
// who is logeged in => token => localstorage => big hash => payload => username
// delete button (login + auther) X (!author && !login  )

  hasBlog(blog:Blog){

    const token:any = localStorage.getItem('token')
    if(token){
   
      const currentUser = JSON.parse(atob(token.split('.')[1])).username
      const blogAuthor = blog.author.username
      return blogAuthor == currentUser
    }
    return false

  }


  deleteBlog(id:any){
    this._blogApiService.delete(id).subscribe((res)=>{
    this.blogs.splice(this.blogs.findIndex((blog)=>blog._id == id),1)
    },()=>{})
  }











  getSortData() {
    return this.blogs.sort((a, b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
  }

}
