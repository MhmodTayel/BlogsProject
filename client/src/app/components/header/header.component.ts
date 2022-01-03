import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  checkLogging(){
    const token = localStorage.getItem('token')
    return token
  }
  ngOnInit(): void {
  }

}
