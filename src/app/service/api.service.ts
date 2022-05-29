import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }


  postSocio(data : any){
    return this.http.post<any>("http://localhost:3000/sociosList/", data);
  }
  getSocio(){
    return this.http.get<any>("http://localhost:3000/sociosList/");
  }
  putSocio(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/sociosList/"+id ,data)
  }
  deleteSocio(id:number){
    return this.http.delete<any>("http://localhost:3000/sociosList/"+id);
  }
}
