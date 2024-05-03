import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ViewReviewComponent } from './view-review/view-review.component';



const routes: Routes = [
  { 'path':'',component:HomeComponent},
  { 'path':'edit/:id',component:EditReviewComponent},
  { 'path':'add',component:AddReviewComponent},
  { 'path':'view/:id',component:ViewReviewComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
