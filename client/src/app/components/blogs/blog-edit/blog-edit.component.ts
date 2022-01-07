import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogApiService } from 'src/app/services/blog-api.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit{



  durationInSeconds = 3;
  imagePreview: string = '';
  receviedImg:string=''
  ID:number=0
  _id:string=''
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _blogApiService: BlogApiService,
    private router: Router,
    private _ativatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._ativatedRoute.paramMap.subscribe(params=>{

      
      this._blogApiService.getById(`/${params.get('id')}`).subscribe(
        (res:any)=>{
               // this.students.push(response.Data);   
              //  this.blog =res;
              this.editForm.patchValue({title: res.title, body: res.body})
               console.log(res);
               this.receviedImg = `http://localhost:3000/${res.image}`
              this._id = res._id
              this.ID = res.id
               
      });
 
     });
  }

  editForm: any = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    image: ['', ],
  });

  openSnackBar() {
    this._snackBar.open('Blog created successfuly', 'ok', {
      duration: this.durationInSeconds * 1000,
    });
  }

  onImagePicked(event: any) {
    
    const file = event.target.files[0];
   
    this.editForm.patchValue({ image: file });
    this.editForm.get('image').updateValueAndValidity();


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
    if (this.editForm.valid) {
      const postData = new FormData();

      postData.append('title', this.editForm.value.title);
      postData.append('body', this.editForm.value.body);
     if(this.imagePreview !== '') {
      postData.append(
        'image',
        this.editForm.value.image,
        this.editForm.value.title
      );
     }
      this._blogApiService.update(this._id,postData).subscribe(
        (res: any) => {
          console.log(res)
          this.openSnackBar();
          setTimeout(() => {
            this.router.navigate([`blog/${this.ID}`]);
          }, 1000);
        },
        () => {}
      );
    }
  }
}
