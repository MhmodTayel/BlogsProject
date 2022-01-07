import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BlogApiService } from './../../services/blog-api.service';
import { Blog } from './../../models/blog';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.scss']
})
export class FollowingComponent implements OnInit {

  followings:string[]=[]
  blogs:Blog[]=[]
  constructor(private _userService:UserService, private _blogService:BlogApiService) { }

  getSortData() {
    return this.blogs.sort((a, b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
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

  deleteBlog(id:any){
    this._blogService.delete(id).subscribe((res)=>{
    this.blogs.splice(this.blogs.findIndex((blog)=>blog._id == id),1)
    },()=>{})
  }

  checkLogging(){
    const token = localStorage.getItem('token')
    return token
  }

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

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    const userLogId = JSON.parse(atob(token.split('.')[1]))._id.toString();
    this._userService.getFollowing(userLogId).subscribe((res: any) => {
      // console.log(res);
      this.followings = res.following; //append one user
      console.log(this.followings);
      this.followings.forEach((user) => {
        this._blogService.getBlogByUserId(user).subscribe((res: any) => {
          this.blogs.push(...res);  //Append mutli user blogs
          console.log(this.blogs)
        })
      
      })
    })
  }

}
  
