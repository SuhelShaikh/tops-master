import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  constructor(private invService : InventoryService) { }

  productlist = null;
  ngOnInit() {
    var formData: FormData = new FormData();
    formData.append("which_service", 'productlist');
    this.invService.productlist(formData).subscribe(responce => {
      if(responce){
        this.productlist=responce;
      
    }

    });
  }

}
