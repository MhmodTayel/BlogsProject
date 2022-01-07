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
  });
  openSnackBar() {
    this._snackBar.open('You registered successfuly', 'ok', {
      duration: this.durationInSeconds * 1000,
    });
  }
  errorSnackBar(username:string) {
    this._snackBar.open(`${username} already registerd`, 'ok', {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this._userService.register(this.registerForm.value).subscribe(
        (res: any) => {
          this.openSnackBar();
          this.router.navigate(['login']);
        },
        (err) => {this.errorSnackBar(err.error.keyValue.username)}
      );
    }
  }
  hide = true;

  ngOnInit(): void {
    // this.registerForm.valueChanges.subscribe((res)=> {
    //   console.log(res)
    // })
  }
}
