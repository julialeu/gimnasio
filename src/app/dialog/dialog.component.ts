import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {MatDialogRef} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  sociosForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.sociosForm = this.formBuilder.group({
      Nombre : ['', Validators.required],
      Apellidos : ['', Validators.required],
      Socio : ['', Validators.required],
      DNI : ['', Validators.required],
      Telefono : ['', Validators.required],
      Sexo : ['', Validators.required],

    })
  }
  addSocio(){
    if(this.sociosForm.valid){
      this.api.postSocio(this.sociosForm.value)
        .subscribe({
          next:(res)=>{
            alert("Socio registrado con éxito");
            this.sociosForm.reset();
            this.dialogRef.close('Guardar');
          },
          error:()=>{
            alert("Error al registrar el usuario")
          }
        })
    }
  }

}
