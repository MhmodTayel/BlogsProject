import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlogCreateComponent } from './components/blogs/blog-create/blog-create.component';
import { BlogComponent } from './components/blogs/blog/blog.component';
import { FollowingComponent } from './components/following/following.component';
import { BlogEditComponent } from './components/blogs/blog-edit/blog-edit.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
   {path:'',redirectTo: '/home',pathMatch: 'full'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'create',component:BlogCreateComponent},
  {path:'edit/:id',component:BlogEditComponent},
  {path:'blog/:id',component:BlogComponent},
  {path:'following',component:FollowingComponent},
  {path:'profile/:username',component:ProfileComponent},
  {path:'**',component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
