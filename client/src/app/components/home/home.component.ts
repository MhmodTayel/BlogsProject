import { Component, OnInit } from '@angular/core';
import { BlogApiService } from './../../services/blog-api.service';
import { Blog } from './../../models/blog';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogs:Blog[] = []
  followings:string[]=[]
  likes:string[]=[]
  
  hideFollow:boolean = true


  constructor(private _blogApiService:BlogApiService,private _userService:UserService) { }

  ngOnInit(): void {
    this._blogApiService.get('/').subscribe((res:any)=>{
      this.blogs = res
      console.log(res)
      const token:any = localStorage.getItem('token')
      const currentUserId = JSON.parse(atob(token.split('.')[1]))._id.toString()
      this._userService.getFollowing(currentUserId).subscribe((res:any)=>{
        this.followings = res.following
        
      })
      this._userService.getlikes(currentUserId).subscribe((res:any)=>{
        this.likes = res.likes
        
      })
    },()=>{})
  }
  checkLogging(){
    const token = localStorage.getItem('token')
    return token
  }

  likeBlog(id:any) {
    const token:any = localStorage.getItem('token')
      const currentUserId = JSON.parse(atob(token.split('.')[1]))._id.toString()
    this._userService.like(currentUserId,id).subscribe((res:any)=>{console.log(res)})
  }


  isLike(id:any) {
    return this.likes.some(blogId=> blogId == id)
  }
  
  /*
    checkFollow(blog:Blog){ 
    let following:any[]=[]
    let hideFollow = false
    const token:any = localStorage.getItem('token')
    const currentUserId = JSON.parse(atob(token.split('.')[1]))._id.toString()
    this._userService.getFollowing(currentUserId).subscribe((res:any)=>{
      following = res.following
      const blogAuthor = blog.author.username
    const check = following.some(user=> user == blogAuthor)
    if(check) hideFollow = true
    else hideFollow = false
    })
   
    

    return hideFollow
  }
  */

  isFollow(blog:Blog):boolean{ 
    const blogAuthor = blog.author.username
    const check = this.followings.some(user=> user == blogAuthor)
    return check
  }

  follow(_id:string) {
    
    const token:any = localStorage.getItem('token')
      const currentUser = JSON.parse(atob(token.split('.')[1]))._id.toString()
    this._userService.follow(currentUser,_id).subscribe((res)=>{console.log(res)})
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
