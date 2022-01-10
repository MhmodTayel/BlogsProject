import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlogApiService } from './../../../services/blog-api.service';
import { LoginComponent } from './../../login/login.component';
import {MatSnackBarConfig} from '@angular/material/snack-bar'

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent {
  durationInSeconds = 3;
  imagePreview: string = '';

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _blogApiService: BlogApiService,
    private router: Router
  ) {}

  createForm: any = this.fb.group({
    title: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
    body: ['', [Validators.required,Validators.minLength(50),Validators.maxLength(500)]],
    image: ['', [Validators.required,]],
    tags: [''],
  });

  openSnackBar() {
    this._snackBar.open('Blog created successfuly', 'ok', {
      duration: this.durationInSeconds * 1000,
      panelClass: 'customSnackBar'

    });
  }

  onImagePicked(event: any) {
    
    const file = event.target.files[0];
    
    this.createForm.patchValue({ image: file });
    this.createForm.get('image').updateValueAndValidity();


    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      
    };
    reader.readAsDataURL(file);
  }

  checkLogging() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['home']);
    }
    return token;
  }

  onSubmit() {
    if (this.createForm.valid) {
      const postData = new FormData();

      postData.append('title', this.createForm.value.title);
      postData.append('body', this.createForm.value.body);
      postData.append('tags', this.createForm.value.tags);
      postData.append(
        'image',this.createForm.value.image,this.createForm.value.title
      );
      this._blogApiService.create(postData).subscribe(
        (res: any) => {
          
          this.openSnackBar();
          setTimeout(() => {
            this.router.navigate([`blog/${res.id}`]);
          }, 1000);
        },
        () => {}
      );
    }
  }
}
