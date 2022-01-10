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
  errorMsg:string=''
  constructor(private fb: FormBuilder, private _userService:UserService,private _snackBar: MatSnackBar,private router: Router ) { }

  loginForm:FormGroup = this.fb.group({
    username: ['',  [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern(
        /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
      ),
    ],],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/\w{8,20}$/),
    ]],
})

  hide = true;

  ngOnInit(): void {
  }
  successSnackBar() {
    this._snackBar.open('You logged in successfuly','ok', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'successCustomSnackBar'

    });
  }
  errorSnackBar() {
    this._snackBar.open(this.errorMsg,'ok', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'failCustomSnackBar'
    });
  }
  
onSubmit(){
  if(this.loginForm.valid){
    //this._hhtp.post('http://localhost:3000/api/auth/login',this.loginForm.value,{headers}).subscible((res:any)=> localStorage.setItem('token',res))
    this._userService.login(this.loginForm.value)
    .subscribe((res:any)=>
    {
      localStorage.setItem('token',JSON.stringify(res))
      console.log(res)
       this.successSnackBar();

       setTimeout(() => {
        this.router.navigate(['home'])
       }, 1000);
      },
      (err)=>{this.errorMsg = err.error; this.errorSnackBar()})
  } 
}

}
