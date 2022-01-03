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
      console.log(res)
    },()=>{})
  }

  getSortData() {
    return this.blogs.sort((a, b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
  }

}
