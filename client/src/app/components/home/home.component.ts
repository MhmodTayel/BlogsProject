import { Component, OnInit } from '@angular/core';
import { BlogApiService } from './../../services/blog-api.service';
import { Blog } from './../../models/blog';
import { UserService } from 'src/app/services/user.service';
import {PageEvent} from '@angular/material/paginator';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  blogs:Blog[] = []
  followings:string[]=[]
  likes:string[]=[]
  pageEvent: PageEvent= new PageEvent();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  hideFollow:boolean = true
  loading:boolean=true
  tags:any[]=[]
  constructor(private _blogApiService:BlogApiService,private _userService:UserService) { }

  ngOnInit(): void {


    this._blogApiService.get('/length').subscribe((res:any)=>this.length = res.length)

    this._blogApiService.get(`/?pageIndex=${this.pageEvent.pageIndex}&pageSize=${this.pageEvent.pageSize}`).subscribe((res:any)=>{
      this.blogs = res
      console.log(res)
      setTimeout(() => {
      this.loading=false
      }, 200);
      const token:any = localStorage.getItem('token')
      const currentUserId = JSON.parse(atob(token.split('.')[1]))._id.toString()
      this._userService.getFollowing(currentUserId).subscribe((res:any)=>{
        this.followings = res.following
        
      })
      this._userService.getlikes(currentUserId).subscribe((res:any)=>{
        this.likes = res.likes
        
      })
    },()=>{})

    this._blogApiService.get('/get/tags').subscribe((res:any)=> {
      res.forEach((item: any)=> this.tags.push(item.tags)); 
      let tempArr = this.tags.reduce((a, b) => [...a, ...b], []);
      this.tags = [...new Set(tempArr)];
      console.log(this.tags);
    })
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
  
  getData(event:PageEvent){
    this.pageEvent = event
    console.log(this.pageEvent )
    this._blogApiService.get(`/?pageIndex=${this.pageEvent.pageIndex}&pageSize=${this.pageEvent.pageSize}`).subscribe((res:any)=>{
      this.blogs= res
    })
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

  search(search:string){
    this._blogApiService.getByTitle(`/search/title?title=${search}`).subscribe((res: any)=>{
      console.log(res);
      this.blogs = res;
      return this.blogs.filter(item=> item.title== search)
    });
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

  getBlogsByTag(tag:string){
    this._blogApiService.get(`/getBlogs/${tag}`).subscribe((res:any)=>{
      this.blogs = res
    })

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
  
    setPageSizeOptions(setPageSizeOptionsInput: string) {
      if (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      
      }
    }
}
