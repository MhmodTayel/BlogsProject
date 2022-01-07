import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser :string=''
  constructor() { }
  checkLogging(){
    const token = localStorage.getItem('token')
    return token
  }
  ngOnInit(): void {
    const token:any = localStorage.getItem('token')
    if(token){
      this.currentUser = JSON.parse(atob(token.split('.')[1])).username
    }
  }

  logout(){
    localStorage.removeItem('token')
  }
}
