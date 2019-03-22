import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InventoryService} from '../inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCSVComponent implements OnInit {
  picture1:File=null;
  picture2:File=null;
  message = null;
  msg:boolean=false;
  imageFile1:File=null;
  imgUrl1=null;
  imgHideShow1 :boolean=false;
  columnList = null;
  mppingdiv :boolean=false;
  tablecol=null;

  constructor(private invService : InventoryService,private router:Router) { }

  ngOnInit() {  
  }
  uploadCSV(data){
    var formData: FormData = new FormData();
    formData.append("picture1",this.imageFile1);
    formData.append("which_service", 'uploadcsv');
        this.invService.uploadCSV(formData).subscribe(responce => {
        
          if(responce=="notmatched"){
            
            this.mppingdiv = true;
            var formData1: FormData = new FormData();
            formData1.append("which_service", 'getColumnNames');
                this.invService.getColumnNames(formData1).subscribe(responceList => {
                  if(responceList){
                    this.columnList=responceList['csvcol'];
                    this.tablecol = responceList['tablecol'];
                }
          
                });
       }else{
       this.router.navigate(['/productList']);
       
       }
  
        });   
    }
    fileChanged1(e: Event) {
      this.imgHideShow1 =true;
      var target: HTMLInputElement = e.target as HTMLInputElement;
      for(var i=0;i < target.files.length; i++) {
          //this.upload(target.files[i]);
      this.imageFile1=target.files[i];
      }
       var reader = new FileReader();
      reader.readAsDataURL(this.imageFile1); 
      reader.onload = (_event) => { 
      this.imgUrl1=reader.result; 
      }
      }

      checkMapping(data){

        var formData: FormData = new FormData();

        console.log(data);
        formData.append("which_service", 'addProduct');
        formData.append("field",JSON.stringify(data.value));
       // formData.append("original_col",data.value.original_col);
       
        this.invService.addProduct(formData).subscribe(responce => {
         if(responce=="success"){
            this.router.navigate(['/productList']);
        }
  
        });

      }

}
