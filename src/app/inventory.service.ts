import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private httpClient : HttpClient) { }

  public uploadCSV(data){
    return this.httpClient.post('http://localhost/ws/upload_inventory.php',data).pipe(map((res:any)=>res));
    //return this.httpClient.post('http://vegaroma.in/Bhushan_demo/ws/upload_inventory.php',data).pipe(map((res:any)=>res));
    
  }

  public getColumnNames(data){
    return this.httpClient.post('http://localhost/ws/upload_inventory.php',data).pipe(map((res:any)=>res));
   // return this.httpClient.post('http://vegaroma.in/Bhushan_demo/ws/upload_inventory.php',data).pipe(map((res:any)=>res));

  }

  public addProduct(data){
    return this.httpClient.post('http://localhost/ws/upload_inventory.php',data).pipe(map((res:any)=>res));
    //return this.httpClient.post('http://vegaroma.in/Bhushan_demo/ws/upload_inventory.php',data).pipe(map((res:any)=>res));

  }

  public productlist(data){
    return this.httpClient.post('http://localhost/ws/upload_inventory.php',data).pipe(map((res:any)=>res));
    //return this.httpClient.post('http://vegaroma.in/Bhushan_demo/ws/upload_inventory.php',data).pipe(map((res:any)=>res));

  }
}
