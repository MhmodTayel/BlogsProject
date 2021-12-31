import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent {

  newBlog:string = 'NO CONTENT'
  enteredValue:string = ''
  onAddBlog(input:string):void{
    this.newBlog = input
  }



}
