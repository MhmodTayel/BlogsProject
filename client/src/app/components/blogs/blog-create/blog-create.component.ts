import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlogApiService } from './../../../services/blog-api.service';
import { LoginComponent } from './../../login/login.component';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent {
  durationInSeconds=3
 

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar,private _blogApiService:BlogApiService,private router: Router ) { }

  createForm:FormGroup = this.fb.group({
    title: ['',Validators.required],
    body: ['',Validators.required],
})

openSnackBar() {
  this._snackBar.open('Blog created successfuly','ok', {
    duration: this.durationInSeconds * 1000,
  });
}




checkLogging(){
  const token = localStorage.getItem('token')
  if (!token) {
    this.router.navigate(['home'])
    
  }
  return token
}

onSubmit(){
if(this.createForm.valid){
  this._blogApiService.create(this.createForm.value)
  .subscribe((res:any)=>
  {
    console.log(res)
     this.openSnackBar();
    },
    ()=>{})
    }
}}
