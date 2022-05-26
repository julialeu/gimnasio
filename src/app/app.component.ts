import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./service/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ejercicio-gimnasio';

  constructor(private dialog: MatDialog, private api : ApiService) {

  }

  ngOnInit(): void {
    this.getAllSocios();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    });
  }
  getAllSocios(){
    this.api.getSocio()
      .subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(err)=>{
          alert("Error al obtener la lista.")
        }
      })
  }
}
