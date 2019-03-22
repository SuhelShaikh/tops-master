import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadCSVComponent } from './upload-csv/upload-csv.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CustomvalidationComponent } from './customvalidation/customvalidation.component';
import { ProductlistComponent } from './productlist/productlist.component';
import {SearchPipe} from '../app/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UploadCSVComponent,
    CustomvalidationComponent,
    ProductlistComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
