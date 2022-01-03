import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  durationInSeconds = 3;

  constructor(private fb: FormBuilder, private _userService:UserService,private _snackBar: MatSnackBar,private router: Router ) { }

  loginForm:FormGroup = this.fb.group({
    username: ['',Validators.required],
    password: ['',Validators.required],
})

  hide = true;

  ngOnInit(): void {
  }
  openSnackBar() {
    this._snackBar.open('You logged in successfuly','ok', {
      duration: this.durationInSeconds * 1000,
    });
  }
  
onSubmit(){
  if(this.loginForm.valid){
    this._userService.login(this.loginForm.value)
    .subscribe((res:any)=>
    {
      localStorage.setItem('token',JSON.stringify(res))
      console.log(res)
       this.openSnackBar();

       setTimeout(() => {
        this.router.navigate(['home'])
       }, 1000);
      },
      ()=>{})
  } 
}

}
