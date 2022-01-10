import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  durationInSeconds = 3;
  imagePreview: string = '';

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  registerForm: any = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(/^[A-Za-z]+$/),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern(/^[A-Za-z]+$/),
      ],
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(
          /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        ),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(30),
        Validators.pattern(/^\S+@\S+\.\S+$/),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/\w{8,20}$/),
      ],
    ],
    image:['',Validators.required]
  });
  openSnackBar() {
    this._snackBar.open('You registered successfuly', 'ok', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'successCustomSnackBar'

    });
  }
  errorSnackBar(username:string) {
    this._snackBar.open(`${username} already registerd`, 'ok', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'failCustomSnackBar'

    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value)
      const postData = new FormData();
      postData.append('username', this.registerForm.value.username);
      postData.append('firstName', this.registerForm.value.firstName);
      postData.append('lastName', this.registerForm.value.lastName);
      postData.append('email', this.registerForm.value.email);
      postData.append('password', this.registerForm.value.password);
      postData.append(
        'image',this.registerForm.value.image,this.registerForm.value.username
      );
      this._userService.register(postData).subscribe(
        (res: any) => {
          this.openSnackBar();
          this.router.navigate(['login']);
        },
        (err) => {this.errorSnackBar(err.error.keyValue.username)}
      );
    }
  }
  hide = true;

  
  onImagePicked(event: any) {
    
    const file = event.target.files[0];
    
    this.registerForm.patchValue({ image: file });
    this.registerForm.get('image').updateValueAndValidity();


    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      
    };
    reader.readAsDataURL(file);
    
  }

  ngOnInit(): void {
    // this.registerForm.valueChanges.subscribe((res)=> {
    //   console.log(res)
    // })
  }
}
