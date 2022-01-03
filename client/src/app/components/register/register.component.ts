import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  durationInSeconds = 3;
 
  constructor(private fb: FormBuilder, private _userService:UserService,private _snackBar: MatSnackBar,private router: Router ) { }

  registerForm:FormGroup = this.fb.group({
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    username: ['',Validators.required],
    email: ['',Validators.required],
    password: ['',Validators.required],
    
})
openSnackBar() {
  this._snackBar.open('You registered successfuly','ok', {
    duration: this.durationInSeconds * 1000,
  });
}

onSubmit(){
  if(this.registerForm.valid){
    this._userService.register(this.registerForm.value)
    .subscribe((res:any)=>
    {
       this.openSnackBar();
        this.router.navigate(['login'])
      },
      ()=>{})
  } 
}
  hide = true;
 
  ngOnInit(): void {
    // this.registerForm.valueChanges.subscribe((res)=> {
    //   console.log(res)
    // })
   
    
  }

  
}
