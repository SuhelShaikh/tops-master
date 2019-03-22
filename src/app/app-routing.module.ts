import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadCSVComponent } from './upload-csv/upload-csv.component';
import { ProductlistComponent } from './productlist/productlist.component';

const routes: Routes = [
  {path :'',component:UploadCSVComponent},
  {path:'productList',component:ProductlistComponent},
  {path :'uploadcsv',component:UploadCSVComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
