import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./service/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ejercicio-gimnasio';
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Socio', 'DNI', 'Telefono', 'Sexo', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog: MatDialog, private api : ApiService) {

  }

  ngOnInit(): void {
    this.getAllSocios();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if (val==='guardar'){
        this.getAllSocios();
      }
    });
  }
  getAllSocios(){
    this.api.getSocio()
      .subscribe({
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err)=>{
          alert("Error al obtener la lista.")
        }
      })
  }
  editSocio(row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val==='actualizar'){
        this.getAllSocios();
      }
    })
  }
  deleteSocio(id: number){
    this.api.deleteSocio(id)
      .subscribe({
        next:(res)=>{
          alert("Socio eliminado");
          this.getAllSocios();
        },
        error: ()=>{
          alert("Error al eliminar socio")
        }
      })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
